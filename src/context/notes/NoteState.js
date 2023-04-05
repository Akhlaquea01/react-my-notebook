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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyOTlkM2Q0ZjJkYmIwMWRjMGQ0N2Y5In0sImlhdCI6MTY4MDQ1MDU3Nn0.Vu8jRTfxXxyKUb-j1Gc4ie8loWsB58i5vkxkmEn7EL0"
            },
            // body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        // console.log(json);
        setnotes(json);

    };
    // Add Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyOTlkM2Q0ZjJkYmIwMWRjMGQ0N2Y5In0sImlhdCI6MTY4MDQ1MDU3Nn0.Vu8jRTfxXxyKUb-j1Gc4ie8loWsB58i5vkxkmEn7EL0"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        // console.log(json);
        let note = {
            "_id": Math.random().toString(36).slice(2),
            "user": "64299d3d4f2dbb01dc0d47f9",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-04-04T01:58:06.406Z",
            "__v": 0
        };
        setnotes(notes.concat(note));
    };
    // Delete Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyOTlkM2Q0ZjJkYmIwMWRjMGQ0N2Y5In0sImlhdCI6MTY4MDQ1MDU3Nn0.Vu8jRTfxXxyKUb-j1Gc4ie8loWsB58i5vkxkmEn7EL0"
            },
            // body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyOTlkM2Q0ZjJkYmIwMWRjMGQ0N2Y5In0sImlhdCI6MTY4MDQ1MDU3Nn0.Vu8jRTfxXxyKUb-j1Gc4ie8loWsB58i5vkxkmEn7EL0"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
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