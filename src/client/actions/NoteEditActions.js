import axios from "axios";



export function updateCurrentEditedNote(id = "", date = "", content = "", mode = "ADD") {
    console.log(mode);
    return {
        type: "UPDATE_CURRENT_EDITED_NOTE",
        payload: {
            id: id,
            date: date,
            content: content,
            currentAction: mode
        }
    }
}

export function updateEditField(content) {
    return {
        type: "UPDATE_EDIT_FIELD",
        payload: content
    }
}



export function addNote(content) {
    return dispatch => {
        axios.post("/note/add", {content: content})
            .then((response) => {
                dispatch ({
                    type: "GUI_UPDATE_VIEW",
                    payload: ""
                });
                alert("Note added sucessfully. Note ID: " + response.data.id);
            })
            .catch((error) => {
                alert(error);
            });
    };


}

export function updateNote(id, content) {
    return dispatch => {
        axios.put("/note/" + id, {content: content})
            .then((response) => {
                dispatch({
                    type: "GUI_UPDATE_VIEW",
                    payload: ""
                });
                alert("Note updated successfully");
            })
            .catch((error) => {
                alert(error);
            });
    }

}





