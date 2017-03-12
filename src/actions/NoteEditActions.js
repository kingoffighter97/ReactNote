



export function updateCurrentEditedNote(id, date, content) {

    // Get note from the database


    return {
        type: "UPDATE_CURRENT_EDITED_NOTE",
        payload: {
            Id: id,
            Date: date,
            Content: content
        }
    }
}



