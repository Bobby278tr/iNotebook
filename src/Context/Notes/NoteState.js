import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  // Get all note 
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMGM0NmM2YjNiNTA1Yzk5OWM1M2ZiIn0sImlhdCI6MTcwOTIyOTE5Mn0.XrEHHIxcT-KKNyYFzk7crOHeJE7lVySUkJ5siI9Luao"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json )
  }

  // Add a note 
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMGM0NmM2YjNiNTA1Yzk5OWM1M2ZiIn0sImlhdCI6MTcwOTIyOTE5Mn0.XrEHHIxcT-KKNyYFzk7crOHeJE7lVySUkJ5siI9Luao"
      },
      body: JSON.stringify({title, description, tag})
    });

    // const json = await response.json()


    console.log("Adding a new Note")
    const note = {
      "_id": "65e37be8721dea713ca11adgbhffh76",
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
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMGM0NmM2YjNiNTA1Yzk5OWM1M2ZiIn0sImlhdCI6MTcwOTIyOTE5Mn0.XrEHHIxcT-KKNyYFzk7crOHeJE7lVySUkJ5siI9Luao"
      }
    });
    const json = await response.json()
    console.log(json) 

    const newNotes = notes.filter((n) => n._id !== id)
    console.log("Deleting note with id " + id)
    setNotes(newNotes)
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMGM0NmM2YjNiNTA1Yzk5OWM1M2ZiIn0sImlhdCI6MTcwOTIyOTE5Mn0.XrEHHIxcT-KKNyYFzk7crOHeJE7lVySUkJ5siI9Luao"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json =  response.json();

  // Logic to edit in client
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (element._id === id) {
      element.title = title;
      element.description = description;
      element.tag = tag;
    }

  }
}


return (
  <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
    {props.children}
  </NoteContext.Provider>
)
}

export default NoteState;