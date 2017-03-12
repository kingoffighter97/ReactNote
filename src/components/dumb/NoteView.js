import React from "react";
import {connect} from "react-redux";
import {addNote} from "../actions/NoteViewActions";



export const NoteView = (props) => {
    // constructor(props) {
    //     super(props);
    //
    //     this.props.noteReducer.ID; //This is the note reducer object
    //
    //     this.props.addNote(); //This is the add note function
    // }

    return (
        <div className="card row offset-md-3 col-md-6">
            <button type="button" className="close offset-md-11 col-md-1" aria-label="Close">
                <span className="float-right" aria-hidden="true">&times;</span>
            </button>
            <div className="card-block">
                <h4 className="card-title">ID - {props.IdNumber}</h4>
                <h6 className="card-subtitle mb-2 text-muted">Last Edited: {props.Date}</h6>
                <p className="card-text">{props.Content}</p>
                <a href="#" onClick={() => props.editBtnClicked()} className="card-link">Edit</a>
            </div>
        </div>
    );

};

/*<div className="container">
 <div className="row">
 <div className="card row offset-sm-2 col-sm-8">
 <div className="card-header">
 <button type="button" className="close" aria-label="Close">
 <span aria-hidden="true">&times;</span>
 </button>
 </div>

 <div className="card-block">
 <h4 className="card-title">ID:5 - Date</h4>
 <p className="card-text">Text Content - THIS IS A TESTING STATIC STRING</p>
 <a href="#" className="btn btn-primary">Edit</a>
 </div>


 </div>
 </div>
 </div>*/

