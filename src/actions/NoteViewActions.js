


// Do the action, if there is anything in the View that is needed to be updated,
// return the data to the Reducer
export function addNote(contents) {

    return {
        type: "ADD",
        payload: contents
    }

}



export function populateNotes(limit,start,order) {

    // Get bunch of notes using limit, start from and order
    var data = [];

    return {
        type: "POPULATE_NOTES",
        payload: data
    }

}

export function populateSingleNote(id) {

    // Get a note using its id
    var data = [];

    return {
        type: "POPULATE_NOTES",
        payload: data
    }

}


