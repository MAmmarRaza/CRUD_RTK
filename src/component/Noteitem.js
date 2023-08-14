import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNotes, getAllNotes, getNoteById } from '../features/notesDetailSlice';
import { updateId } from '../features/modelSlicer';

const Noteitem = (props) => {
  const dispatch=useDispatch();
  const handleDelete = async() => {
    await dispatch(deleteNotes({ id: props.id })) // Dispatch the delete action with the note's ID
    await dispatch(getAllNotes());
  };

  const handleEdit=()=>{
    dispatch(updateId( props.id ))
  }
  return (
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.desc}</p>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-info me-2" onClick={() => { props.onEdit(); handleEdit(); }} >
              <i className="fas fa-edit"></i> Edit
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete} >
              <i className="fas fa-trash-alt"  ></i> Delete
            </button>
          </div>
        </div>
      </div>
  );
};

export default Noteitem;
