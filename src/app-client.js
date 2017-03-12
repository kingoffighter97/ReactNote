import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

import {App} from "./components/smart/App.js";
import store from "./store";

// connect the store to all the components
render(
<Provider store={store}>
    <App />
    </Provider>,
    window.document.getElementById('app'));