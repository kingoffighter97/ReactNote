import React from "react";




export const NoteView = (props) => {

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

