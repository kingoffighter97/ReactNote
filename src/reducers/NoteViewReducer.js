




// Get command from the action from the Actions.
// This is storing data to displayed to the GUI
const NoteViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case "POPULATE_NOTES":
            state = {
                ...state,
                note :action.payload
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