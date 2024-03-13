import React, { useContext, useState, useEffect, useRef } from 'react'
import NoteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import { AddNote } from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props)  => {
    const navigate=useNavigate()
    const context = useContext(NoteContext)
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "default" })
    const { notes, getNote, editNote} = context
    useEffect(() => {
        if(localStorage.getItem('token')){
            // eslint-disable-next-line
            getNote()
        }
        else{
            navigate('/login')
        }
    })
    const ref = useRef(null)
    const refClose = useRef(null)
    const updateNote = (currentNote) => {
        setNote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
        ref.current.click()
    }

    const handleClick = (e) => {
        refClose.current.click()
        editNote(note.id,note.etitle,note.edescription,note.etag)
        props.showAlert("Note Successfully Edited", "success")
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' placeholder="Enter Title Here" onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>

                                    <textarea className="form-control" id="edescription" name='edescription' rows="5" placeholder='Enter Description Here' onChange={onchange} minLength={5} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' placeholder="Enter Tag Here" onChange={onchange} />
                                </div>
                            </form >
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button disabled={note.etitle.length<5 && note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <NoteItem showAlert={props.showAlert}  key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
