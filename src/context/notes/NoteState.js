import React, { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const notesInitial =[]

    const [notes, setNotes] = useState(notesInitial)
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json()
        setNotes(notes.concat(json))
    }

    const getNote=async()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
        });
        const json  = await response.json()
        setNotes(json)
    }

    const deleteNote = async (id) => {
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
        });
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

    }
    const editNote = async (id, title, description, tag) => {
        // eslint-disable-next-line
        const  response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                'title': title,
                'description': description,
                'tag':tag})
        });
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag
            }
        }
    }
    return (
        <NoteContext.Provider value={{ notes, editNote, addNote, deleteNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState