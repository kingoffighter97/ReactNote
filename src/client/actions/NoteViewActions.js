
import axios from "axios";

// Do the action, if there is anything in the View that is needed to be updated,
// return the data to the Reducer



export function multiSearchNotes(limit,start,order) {

    // Get a bunch of notes using limit, start from and order
    axios.get("/api/note?limit=" + limit + "&start=" + start +"&order=" + order)
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


    axios.get("/api/note/" + id)
        .then((response) => {
            return ({
                type: "NOTE_SSEARCH_OK",
                payload: response.data
            });
        })
        .catch(() => {
            alert("Single search failed!");
        });

}




