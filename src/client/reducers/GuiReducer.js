


// Get command from the action from the Actions.
// This is storing data to displayed to the GUI
const GuiReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GUI_UPDATE_LIMIT":
            state = {
                ...state,
                limit: action.payload
            };
            break;

        case "GUI_UPDATE_START":
            state = {
                ...state,
                start: action.payload
            };
            break;

        case "GUI_UPDATE_ORDER":
            state = {
                ...state,
                order: action.payload
            };
            break;

        case "GUI_UPDATE_SINGLE_SEARCH":
            state = {
                ...state,
                id: action.payload
            };
            break;

        case "GUI_UPDATE_VIEW":
            state = {
                ...state,
                currentIn: action.payload
            };
            break;

    }
    return state;
};


const initialState = {
    limit: "",
    start: "1",
    order: "DESC",
    id: "",
    currentIn: "VIEW"
};

export default GuiReducer;