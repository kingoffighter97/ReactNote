




// Get command from the action from the Actions.
// This is storing data to displayed to the GUI
const NoteViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NOTE_SSEARCH_OK":
            console.log(action.payload);
            state = {
                ...state,
                notes: action.payload
            };
            console.log(state.notes);
            break;

        case "NOTE_MSEARCH_OK":
            state = {
                ...state,
                notes :action.payload
            };
            break;
        }
    return state;
};

const initialState = {
    notes: [{
        Id: 1,
        Date: "WHAT",
        Content: "THIS IS A TESTING STRING"
    }],
};

export default NoteViewReducer;