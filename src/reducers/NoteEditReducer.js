




// Get command from the action from the Actions.
// This is storing data to displayed to the GUI
const NoteEditReducer = (state = initialState, action) => {

    switch (action.type) {
        case "UPDATE_CURRENT_EDITED_NOTE":
            state = {
                ...state,
                Id: action.payload.Id,
                Date: action.payload.Date,
                Content: action.payload.Content
            };
            break;
    }
    return state;
};

const initialState = {
    Id: 0,
    Date: "",
    Content: "THIS IS A TESTING STRING"
};

export default NoteEditReducer;