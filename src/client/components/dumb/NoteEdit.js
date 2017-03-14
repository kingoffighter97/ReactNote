


import React from "react";


export const NoteEdit = (props) => {
    return (
        <div className="card row offset-md-3 col-md-6">
            <button type="button" className="close col-md-1" aria-label="Close">
                <span className="float-left" aria-hidden="true">&laquo;</span>
            </button>

            <div className="form-group">
                <textarea
                    className="form-control"
                    id="exampleTextarea"
                    rows="3"
                    value={props.Content}
                    onChange={() => props.handleEditNoteChange()}
                />
                <br/>
                <button
                    type="button"
                    onClick={() => props.handleSaveBtn()}
                    className="float-right offset-md-4 btn btn-primary"
                >
                    Save
                </button>
            </div>
        </div>
    );

};


