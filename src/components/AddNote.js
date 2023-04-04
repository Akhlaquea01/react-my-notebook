import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';


function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [ note, setnote ] = useState({ title: "", description: "", tag: 'default' });
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    };
    const onChange = (e) => {
        setnote({ ...note, [ e.target.name ]: e.target.value });
    };
    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" name='title' onChange={onChange} className="form-control" id="title" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" name='description' onChange={onChange} className="form-control" id="description" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddNote;