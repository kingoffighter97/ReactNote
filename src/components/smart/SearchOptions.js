
import React from "react";
import {connect} from "react-redux";
import {populateNotes} from "../actions/NoteViewActions";

import {updateLimit, updateStart, updateOrder, updateId, updateView} from "../actions/GuiActions";

class SearchOptions extends React.Component {
    render() {
        var props = this.props.guiReducer;
        return (
            <div className="modal-body row col-md-8 offset-md-2">
                <form className="col-md-6">
                    <div className="form-group row">
                        <label className="col-md-5 col-form-label"><b>Limit</b></label>
                        <div className="col-md-6">
                            <input className="form-control" onChange={(e) => this.props.handleLimitChange(e)} type="text" id="example-text-input" placeholder="Default: 10"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-5 col-form-label"><b>Start from</b></label>
                        <div className="col-md-6">
                            <input className="form-control" onChange={(e) => this.props.handleStartChange(e)} type="search" id="example-search-input" placeholder="Default: 1"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-5 col-form-label" ><b>Order</b></label>
                        <div className="col-md-6">
                            <select className="form-control custom-select" onChange={(e) => this.props.handleOrderChange(e)} id="inlineFormCustomSelect">
                                <option value="ASC" selected>Ascending</option>
                                <option value="DSC">Descending</option>
                            </select>
                        </div>
                    </div>

                    <button type="button" onClick={() => this.handleMassSearchBtn(props.limit, props.start, props.order)} className="offset-md-2 btn btn-primary">Mass Search</button>
                </form>

                <form className="col-md-6">
                    <div className="form-group row">
                        <label className="col-md-5 col-form-label"><b>Search For:</b></label>
                        <div className="col-md-6">
                            <input className="form-control" onChange={(e) => this.props.handleSearchIdChange(e)} type="text" id="example-text-input" placeholder="Default: 10"/>
                        </div>
                    </div>

                    <button type="button" onClick={() => this.props.handleViewChange("View")} className="row offset-md-3 btn btn-primary">Search</button>
                </form>
            </div>
        );
    }
}


// state is passed in from the store
const mapStateToProps = (state) => {
    return {
        noteViewReducer: state.NoteViewReducer,
        guiReducer: state.GuiReducer
    };
};


// Declaring functions to be used and link them with the actions (through the store)
const mapDispatchToProps = (dispatch) => {
    return {


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchOptions);