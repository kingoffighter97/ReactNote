




// Get command from the action from the Actions.
// This is storing data to displayed to the GUI
const NoteEditReducer = (state = initialState, action) => {

    switch (action.type) {
        case "UPDATE_CURRENT_EDITED_NOTE":
            state = {
                ...state,
                Id: action.payload.Id,
                Date: action.payload.Date,
                Content: action.payload.Content,
                CurrentAction: action.payload.CurrentAction
            };
            break;

    }
    return state;
};

const initialState = {
    Id: 0,
    Date: "",
    Content: "",
    CurrentAction: "ADD"
};

export default NoteEditReducer;