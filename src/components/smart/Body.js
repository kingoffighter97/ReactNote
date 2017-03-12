
import React from "react";
import SearchOptions from "../components/SearchOptions";
import {NoteView} from "../components/NoteView";
import {NoteEdit} from "../components/NoteEdit";
import {connect} from "react-redux"

import {updateLimit, updateStart, updateOrder, updateId, updateView} from "../actions/GuiActions";
import {updateCurrentEditedNote} from "../actions/NoteEditActions";

class Body extends React.Component {
    render() {
        var content = "";
        var currentIn = this.props.guiReducer.currentIn;
        if (currentIn == "VIEW")
        {
            console.log("currentIn: View");
            var listOfNotes = this.props.noteViewReducer.notes;
            if (listOfNotes.Length == 0)
            {
                content = <p>There's nothing yet</p>
            }
            else
            {
                content = listOfNotes.map((i) =>
                    <NoteView IdNumber={i.Id} Date={i.Date} Content={i.Content} editBtnClicked={() => this.props.handleEditBtn(i.Id, i.Date, i.Content)} />
                );
            }

        }
        else if (currentIn == "EDIT")
        {
            console.log("currentIn: Edit");
            var i = this.props.noteEditReducer;
            content = <NoteEdit IdNumber={i.Id} Date={i.Date} Content={i.Content} />;
        }


        return (
            <div>
                <SearchOptions/>
                <hr/>
                {content}
            </div>
        );
    }
}


// state is passed in from the store
const mapStateToProps = (state) => {
    return {
        noteViewReducer: state.NoteViewReducer,
        noteEditReducer: state.NoteEditReducer,
        guiReducer: state.GuiReducer
    };
};


// Declaring functions to be used and link them with the actions (through the store)
const mapDispatchToProps = (dispatch) => {
    return {
        handleEditBtn: (id, date, content) => {
            dispatch(updateView("EDIT"));
            dispatch(updateCurrentEditedNote(id, date, content));
        },
        handleLimitChange: (event) => {
            dispatch(updateLimit(event.target.value));
        },
        handleStartChange: (event) => {
            dispatch(updateStart(event.target.value));
        },
        handleOrderChange: (event) => {
            dispatch(updateOrder(event.target.value));
        },
        handleSearchIdChange: (event) => {
            dispatch(updateId(event.target.value));
        },
        handleViewChange: (state) => {
            dispatch(updateView(state));
        },
        handleMassSearchBtn: (limit, start, order) => {
            dispatch(populateNotes(limit, start, order));
            dispatch(updateView("View"));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);