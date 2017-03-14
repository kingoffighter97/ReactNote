




// Get command from the action from the Actions.
// This is storing data to displayed to the GUI
const NoteEditReducer = (state = initialState, action) => {

    switch (action.type) {
        case "UPDATE_CURRENT_EDITED_NOTE":
            state = {
                ...state,
                id: action.payload.id,
                date: action.payload.date,
                content: action.payload.content,
                currentAction: action.payload.currentAction
            };
            break;

    }
    return state;
};

const initialState = {
    id: "",
    date: "",
    content: "",
    currentAction: "ADD"
};

export default NoteEditReducer;