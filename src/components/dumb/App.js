import React from "react";
import {connect} from "react-redux";

//import {setName} from "../actions/userActions";

import {Header} from "./Header";
import Body from "./Body";

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


// const mapStateToProps = (state) => {
//     return {
//         user: state.user,
//         math: state.math
//     };
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         setName: (name) => {
//             dispatch(setName(name));
//         }
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);