import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const noteInitial = [
    ];
    const [ notes, setnotes ] = useState(noteInitial);

    // fetch  Note
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            // body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(response);
        setnotes(json);

    };
    // Add Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setnotes(notes.concat(note));
    };
    // Delete Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            // body: JSON.stringify({title, description, tag})
        });
        console.log(response);

        // const json = await response.json();
        // console.log(json);
        // console.log(id);
        const newNotes = notes.filter((note) => { return note._id !== id; });
        setnotes(newNotes);
    };

    // Edit Node
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        console.log(response);

        // const json = await response.json();
        // console.log(json);

        let newNotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[ index ];
            if (element._id === id) {
                newNotes[ index ].title = title;
                newNotes[ index ].tag = tag;
                newNotes[ index ].description = description;
            }

        }
        setnotes(newNotes)

    };

    // eslint-disable-next-line react/jsx-pascal-case
    return (< NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }} >
        {props.children}
    </NoteContext.Provider >);
};

export default NoteState;