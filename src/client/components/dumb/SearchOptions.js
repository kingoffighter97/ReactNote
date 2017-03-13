
import React from "react";

export const SearchOptions = (props) => {
    return (
        <div className="modal-body row col-md-8 offset-md-2">
            <form className="col-md-6">
                <div className="form-group row">
                    <label className="col-md-5 col-form-label"><b>Limit</b></label>
                    <div className="col-md-6">
                        <input className="form-control" onChange={(e) => props.handleLimitChange(e)} type="text" id="example-text-input" placeholder="Default: 10"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-md-5 col-form-label"><b>Start from</b></label>
                    <div className="col-md-6">
                        <input className="form-control" onChange={(e) => props.handleStartChange(e)} type="search" id="example-search-input" placeholder="Default: 1"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-md-5 col-form-label" ><b>Order</b></label>
                    <div className="col-md-6">
                        <select className="form-control custom-select" onChange={(e) => props.handleOrderChange(e)} id="inlineFormCustomSelect">
                            <option value="ASC">Ascending</option>
                            <option value="DSC">Descending</option>
                        </select>
                    </div>
                </div>

                <button type="button" onClick={() => props.handleMassSearchBtn()} className="offset-md-2 btn btn-primary">Mass Search</button>
            </form>

            <form className="col-md-6">
                <div className="form-group row">
                    <label className="col-md-5 col-form-label"><b>Search For:</b></label>
                    <div className="col-md-6">
                        <input className="form-control" onChange={(e) => props.handleSearchIdChange(e)} type="text" id="example-text-input" placeholder="Default: 10"/>
                    </div>
                </div>

                <button type="button" onClick={() => props.handleSingleSearchBtn()} className="row offset-md-3 btn btn-primary">Search</button>
            </form>
        </div>
    );
};