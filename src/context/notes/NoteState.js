import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const noteInitial = [
        {
            "_id": "642b842d0796b45fa2e8649d",
            "user": "64299d3d4f2dbb01dc0d47f9",
            "title": "Atts",
            "description": "Hi How are you",
            "tag": "test",
            "date": "2023-04-04T01:58:05.339Z",
            "__v": 0
        },
        {
            "_id": "642b842e0796b45fa2e8649f",
            "user": "64299d3d4f2dbb01dc0d47f9",
            "title": "Atts",
            "description": "Hi How are you",
            "tag": "test",
            "date": "2023-04-04T01:58:06.406Z",
            "__v": 0
        }
    ];
    const [ notes, setnotes ] = useState(noteInitial);

    // Add Note
    const addNote = (title, description, tag) => {
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
    const deleteNode = () => {

    };

    // Edit Node
    const editNote = () => {

    };

    // eslint-disable-next-line react/jsx-pascal-case
    return (< NoteContext.Provider value={{ notes, addNote, editNote, deleteNode }} >
        {props.children}
    </NoteContext.Provider >);
};

export default NoteState;