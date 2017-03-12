


// Do the action, if there is anything in the View that is needed to be updated,
// return the data to the Reducer
export function addNote(contents) {

    return {
        type: "ADD",
        payload: contents
    }

}



export function populateNotes(limit,start,order) {

    // Connect to database to get data
    var data = [];

    return {
        type: "POPULATE_NOTES",
        payload: data
    }

}


