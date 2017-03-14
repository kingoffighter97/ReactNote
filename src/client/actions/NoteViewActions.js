
import axios from "axios";

// Do the action, if there is anything in the View that is needed to be updated,
// return the data to the Reducer



export function multiSearchNotes(limit,start,order) {

    // Get a bunch of notes using limit, start from and order
    return dispatch => {
        axios.get("/note?limit=" + limit + "&start=" + start +"&order=" + order)
            .then((response) => {
                dispatch ({
                    type: "NOTE_MSEARCH_OK",
                    payload: response.data
                });
            })
            .catch((error) => {
                if (error.response.status == 400) {
                    alert("Error: 'Limit' was too low and/or 'Start from' was too high.");
                }
            });
    };
}


export function singleSearchNote(id) {
    return dispatch => {
        axios.get("/note/" + id)
            .then((response) => {
                dispatch({
                    type: "NOTE_SSEARCH_OK",
                    payload: response.data
                })
            })
            .catch((error) => {
                if (error.response.status == 400) {
                    alert("Note with ID " + id + " does not exist.");
                }
            })
    };

}




