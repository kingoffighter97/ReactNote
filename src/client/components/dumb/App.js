import React from "react";
import Header from "../smart/Header";
import Body from "../smart/Body";

export const App = (props) => {
    return (
        <div>
            <Header/>
            <div className="clearfix"></div>
            <hr/>
            <Body />
        </div>
    );
};
