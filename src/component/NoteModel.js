import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateNotes } from '../features/notesDetailSlice';

export default function NoteModel(props) {
  const [note, setNote] = useState({
    id: props.id,
    title: props.title,
    description: props.description,
    tag: "default tag"
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const dispatch = useDispatch();

//   const handleSaveUpdate = () => {
//     dispatch(updateNotes(note));
    
//   };
const handleSaveUpdate = () => {
    dispatch(updateNotes(note)).then((result) => {
      if (!updateNotes.rejected.match(result)) {
        // Close the modal or perform any other action after successful update
        props.onClose();
      }
    });
  };
  

  return (
    <div>
      <Modal show={props.showModal} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group mt-3">
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                className="form-control mt-1"
                id="title"
                name="title"
                value={note.title}
                onChange={onChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="description">Description: </label>
              <input
                type="text"
                className="form-control mt-1"
                id="description"
                name="description"
                value={note.description}
                onChange={onChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block mt-3"
              onClick={handleSaveUpdate}
            >
              Save Changes
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
