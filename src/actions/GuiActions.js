


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



export function updateLimit(limit) {
    return {
        type: "GUI_UPDATE_LIMIT",
        payload: limit
    }
}

export function updateStart(start) {
    return {
        type: "GUI_UPDATE_START",
        payload: start
    }
}

export function updateOrder(order) {
    return {
        type: "GUI_UPDATE_ORDER",
        payload: order
    }
}

export function updateId(id) {
    return {
        type: "GUI_UPDATE_SINGLE_SEARCH",
        payload: id
    }
}

export function updateView(state) {
    return {
        type: "GUI_UPDATE_VIEW",
        payload: state
    }
}