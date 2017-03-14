
import React from "react";
import {connect} from "react-redux";
import {updateView} from "../../actions/GuiActions";
import {updateCurrentEditedNote} from "../../actions/NoteEditActions";

class Header extends React.Component {

    render() {
        return (
            <div className ="page-header row page-heading">
                <h3 className="float-left offset-md-1 col-md-5">React Note</h3>
                <p className="float-right offset-md-3 col-md-3"><a href="#" onClick={() => this.props.handleNewBtn(this.props.guiReducer.currentIn)}>New Note</a></p>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        guiReducer: state.GuiReducer
    };
};


// Declaring functions to be used and link them with the actions (through the store)
const mapDispatchToProps = (dispatch) => {
    return {
        handleNewBtn: (state) => {
            var advance = true;
            if (state == "EDIT") {
                if (confirm("You are currently editting a note, do you want to save it before adding a new note?")) {
                    // Yes -> do nothing
                    advance = false;
                }
            }
            if (advance) {
                dispatch(updateView("EDIT"));
                dispatch(updateCurrentEditedNote());
            }

        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);