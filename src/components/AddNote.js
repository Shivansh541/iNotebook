import React, {useState, useContext} from 'react'
import NoteContext from '../context/notes/noteContext'


export const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote} = context

    const [note, setNote] = useState({title: "", description: "", tag: "default"})
    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        props.showAlert("Note Successfully Added", "success")
    }
    const onchange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <h1>Add Note</h1>
            <form action="">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                    <input minLength={5} required type="text" className="form-control" id="title" name='title' placeholder="Enter Title Here" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>

                    <textarea minLength={5} required className="form-control" id="description" name='description' rows="5" placeholder='Enter Description Here' onChange={onchange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' placeholder="Enter Tag Here" onChange={onchange} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} onClick={handleClick} type="submit" className="btn btn-dark">Add Note</button>
            </form >
        </div>
    )
}

