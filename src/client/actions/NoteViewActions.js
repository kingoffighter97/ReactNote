
import axios from "axios";

// Do the action, if there is anything in the View that is needed to be updated,
// return the data to the Reducer



export function multiSearchNotes(limit,start,order) {

    // Get a bunch of notes using limit, start from and order
    axios.get("/note?limit=" + limit + "&start=" + start +"&order=" + order)
        .then((response) => {
            return ({
                type: "NOTE_MSEARCH_OK",
                payload: response.data
            });
        })
        .catch(() => {
            alert("Mass search failed!");
        });

}

export function singleSearchNote(id) {
    console.log("id: ", id);
    return dispatch => {
        axios.get("/note/" + id)
            .then((response) => {
                console.log(response.data);
                dispatch({
                    type: "NOTE_SSEARCH_OK",
                    payload: response.data
                })
            })
            .catch((error) => {
                alert("ERROR: " + error);
            })
    };
}




