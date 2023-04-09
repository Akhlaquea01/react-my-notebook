import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';


function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [ note, setnote ] = useState({ title: "", description: "", tag: 'default' });
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: 'default' });
        props.showAlert("Add Note","success");
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
                        <input type="text" value={note.title} required minLength={5} name='title' onChange={onChange} className="form-control" id="title" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" value={note.description} required minLength={5} name='description' onChange={onChange} className="form-control" id="description" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" value={note.tag} name='tag' onChange={onChange} className="form-control" id="tag" />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.lenght < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    );
}

export default AddNote;