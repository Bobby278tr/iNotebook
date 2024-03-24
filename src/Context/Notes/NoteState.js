import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "65e0e5b4e348f2c9fa7bfe00",
          "user": "65e0c46c6b3b505c999c53fb",
          "title": "Notebook",
          "description": "Need to complete the notebook app as early as possible",
          "tag": "Project In React",
          "date": "2024-02-29T20:14:44.973Z",
          "__v": 0
        },
        {
          "_id": "65e37be8721da713ca11ad76",
          "user": "65e0c46c6b3b505c999c53fb",
          "title": "Notebook 5",
          "description": "Need to complete the notebook app using react as eewfedarly as possible and upload it on githdscdcfdub",
          "tag": "React, JavaScript",
          "date": "2024-03-02T19:20:08.255Z",
          "__v": 0
        },
        {
            "_id": "65e0e5b4ge348f2c9fa7bfe00",
            "user": "65e0c46c6b3b505c999c53fb",
            "title": "Notebook",
            "description": "Need to complete the notebook app as early as possible",
            "tag": "Project In React",
            "date": "2024-02-29T20:14:44.973Z",
            "__v": 0
          },
          {
            "_id": "65e37be8721eda713ca11ad76",
            "user": "65e0c46c6b3b505c999c53fb",
            "title": "Notebook 5",
            "description": "Need to complete the notebook app using react as eewfedarly as possible and upload it on githdscdcfdub",
            "tag": "React, JavaScript",
            "date": "2024-03-02T19:20:08.255Z",
            "__v": 0
          },
          {
            "_id": "65e0e5b4e348f2c9gffa7bfe00",
            "user": "65e0c46c6b3b505c999c53fb",
            "title": "Notebook",
            "description": "Need to complete the notebook app as early as possible",
            "tag": "Project In React",
            "date": "2024-02-29T20:14:44.973Z",
            "__v": 0
          },
          {
            "_id": "65e37be8721dea713ca11ad76",
            "user": "65e0c46c6b3b505c999c53fb",
            "title": "Notebook 5",
            "description": "Need to complete the notebook app using react as eewfedarly as possible and upload it on githdscdcfdub",
            "tag": "React, JavaScript",
            "date": "2024-03-02T19:20:08.255Z",
            "__v": 0
          }
      ]
    
    const [notes, setNotes] = useState(notesInitial)

    // Add a note 
    const addNote = (title, description, tag) =>{
      // TODO: API Call
      console.log("Adding a new Note")
      const note = {
        "_id": "65e37be8721dea713ca11ad76",
        "user": "65e0c46c6b3b505c999c53fb",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-03-02T19:20:08.255Z",
        "__v": 0
      }
      setNotes(notes.concat(note))
    }

    // Delete a note
    const deleteNote = (id) =>{
      const newNotes = notes.filter((n)=> n._id !== id )
      console.log("Deleting note with id "+ id)
      setNotes(newNotes)
    }

    // Edit a note
    const editNote = (id) =>{
      
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;