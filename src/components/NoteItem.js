import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'


const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const { deleteNote } = context
    const { note , updateNote } = props
    return (
        <div className='col-md-3 '>
            <div className="card my-3" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. At quas ut minima, eveniet perferendis neque animi. Ipsum eligendi deserunt dolorum, unde tempore quo vitae. Veniam, explicabo est. Excepturi ipsam exercitationem, doloremque, asperiores labore voluptas facilis error veritatis blanditiis doloribus dolorum!</p>
                    <i onClick={() => { deleteNote(note._id); props.showAlert("Note Successfully Deleted", "success") }} className="fa-solid fa-trash mx-2"></i>
                    <i onClick={()=>{updateNote(note)}} className="fa-solid fa-edit mx-2"></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
