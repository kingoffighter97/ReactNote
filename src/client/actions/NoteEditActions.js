import axios from "axios";



export function updateCurrentEditedNote(id = "", date = "", content = "", mode = "ADD") {

    return {
        type: "UPDATE_CURRENT_EDITED_NOTE",
        payload: {
            Id: id,
            Date: date,
            Content: content,
            CurrentAction: mode
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

    axios.post("/note/add", content)
        .then((response) => {
            alert("Note added sucessfully. Note ID: " + response.data.id);
        })
        .catch(() => {
            alert("Failed to add note");
        });

}

export function updateNote(id, content) {

    axios.put("/note" + id, content)
        .then(() => {
            alert("Note updated successfully");
        })
        .catch(() => {
            alert("Failed to update note");
        });

}





