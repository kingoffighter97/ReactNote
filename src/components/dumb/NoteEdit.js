


import React from "react";


export const NoteEdit = (props) => {
    return (
        <div className="card row offset-md-3 col-md-6">
            <button type="button" className="close col-md-1" aria-label="Close">
                <span className="float-left" aria-hidden="true">&laquo;</span>
            </button>

            <div className="form-group">
                <textarea className="form-control" id="exampleTextarea" rows="3">{props.Content}</textarea>
                <br/>
                <button type="button" onClick={() => props.handleSaveBtn()} className="float-right offset-md-4 btn btn-primary">Save</button>
            </div>
        </div>
    );

};
/*<div className="card-block">
 <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
 <a href="#" className="card-link">Edit</a>
 </div>*/
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

