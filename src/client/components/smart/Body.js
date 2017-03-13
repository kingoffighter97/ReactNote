
import React from "react";
import {connect} from "react-redux"
import {SearchOptions} from "../dumb/SearchOptions";
import {NoteView} from "../dumb/NoteView";
import {NoteEdit} from "../dumb/NoteEdit";

import {updateLimit, updateStart, updateOrder, updateId, updateView} from "../../actions/GuiActions";
import {updateCurrentEditedNote} from "../../actions/NoteEditActions";
import {singleSearchNote, multiSearchNotes} from "../../actions/NoteViewActions"

class Body extends React.Component {
    render() {
        var content = "";
        var gui = this.props.guiReducer;
        if (gui.currentIn == "VIEW")
        {
            console.log("currentIn: View");
            var listOfNotes = this.props.noteViewReducer.notes;
            if (listOfNotes.Length == 0)
            {
                content = <p>There's nothing yet</p>
            }
            else
            {
                content = listOfNotes.map((object, i) =>
                    <NoteView
                        key = {i}
                        IdNumber={object.Id}
                        Date={object.Date}
                        Content={object.Content}
                        editBtnClicked={() => this.props.handleEditBtn(object.Id, object.Date, object.Content)}
                    />
                );
            }

        }
        else if (gui.currentIn == "EDIT")
        {
            console.log("currentIn: Edit");
            var i = this.props.noteEditReducer;
            content = <NoteEdit
                IdNumber={i.Id}
                Date={i.Date}
                Content={i.Content}
                handleSaveBtn={() => this.props.handleSaveBtn(i)}
            />;
        }


        return (
            <div>
                <SearchOptions
                    handleLimitChange={(e) => this.props.handleLimitChange(e)}
                    handleStartChange={(e) => this.props.handleStartChange(e)}
                    handleOrderChange={(e) => this.props.handleOrderChange(e)}
                    handleSearchIdChange={(e) => this.props.handleSearchIdChange(e)}
                    handleMassSearchBtn={() => this.props.handleMassSearchBtn(gui.limit, gui.start, gui.order)}
                    handleSingleSearchBtn={() => this.props.handleSingleSearchBtn(gui.id)}
                />
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
            dispatch(updateCurrentEditedNote(id, date, content, mode));
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
        handleMassSearchBtn: (limit, start, order) => {
            dispatch(multiSearchNotes(limit, start, order));
            dispatch(updateView("VIEW"));
        },
        handleSingleSearchBtn: (id) => {
            dispatch(singleSearchNote(id));
            dispatch(updateView("VIEW"));
        },
        handleSaveBtn: (state) => {
            if (state.currentAction == "ADD")
            {
                dispatch(addNote(state.content));
            }
            else if (state.currentAction == "UPDATE")
            {
                dispatch(updateNote(state.id, state.content));
            }
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);