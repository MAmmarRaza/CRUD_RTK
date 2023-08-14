import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import { addNotes}  from '../features/notesDetailSlice';


function AddNotes() {
    const [note, setNote] = useState({ title: "", description: "", tag: "default value" });
    const onChange = (element) => {
        setNote({...note , [element.target.name]:element.target.value })
    }
    const dispatch = useDispatch();
   const handleFormSubmit=(e)=>{
    e.preventDefault();
    dispatch(addNotes({ title: note.title, description: note.description, tag: note.tag }));
   }

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header bg-primary text-white text-center">
                                <h4>Add Note</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-group mt-3">
                                        <label htmlFor="name">Title: </label>
                                        <input
                                            type="text"
                                            className="form-control mt-1"
                                            id="title"
                                            name="title"
                                            placeholder="Enter your name"
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="email">Description: </label>
                                        <input
                                            type="text"
                                            className="form-control mt-1"
                                            id="description"
                                            name="description"
                                            placeholder="Enter your email"
                                            onChange={onChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mt-3"  >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNotes
