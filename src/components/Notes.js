import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';


function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {


        return () => {
            getNotes();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({ id: currentNote._id, etitle: currentNote.title, etag: currentNote.tag, edescription: currentNote.description });
        props.showAlert("Updated Successfully","success");

    };
    const [ note, setnote ] = useState({ id: '', etitle: "", edescription: "", etag: 'default' });

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();

        e.preventDefault();
        props.showAlert("Updated","danger");

    };
    const onChange = (e) => {
        setnote({ ...note, [ e.target.name ]: e.target.value });
    };

    const ref = useRef(null);
    const refClose = useRef(null);

    return (
        <>
            <AddNote showAlert={props.showAlert}></AddNote>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" name='etitle' required minLength={5} value={note.etitle} onChange={onChange} className="form-control" id="etitle" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" required minLength={5} name='edescription' value={note.edescription} onChange={onChange} className="form-control" id="edescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" name='etag' value={note.etag} onChange={onChange} className="form-control" id="etag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5||note.edescription.lenght<5} onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className='container'>
                {notes?.length === 0 && "No notes to display</div>"}
                </div>
                {notes.map((note) => {
                    return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    );
}

export default Notes;