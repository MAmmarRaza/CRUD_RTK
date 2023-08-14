import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Noteitem from "./Noteitem";
import AddNotes from './AddNotes'

import { getAllNotes } from "../features/notesDetailSlice";
import NoteModel from "./NoteModel";

const Notes = () => {
    const data = useSelector((state) => state.notesApp.notes);
    const id = useSelector((c) => c.models.value);
    const noteData = data.filter((ele) => ele._id === id );

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getAllNotes());
    }, [dispatch]);

    if (data.loading) {
        return <h2>Loading</h2>;
    }

    if (data.error != null) {
        console.log(data.error);
    }

    const handleEditClick = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    };

    // Check if id is not an empty string and noteData is available
    const isNoteDataAvailable = id !== "" && noteData.length > 0;

    return (
        <>
            {isNoteDataAvailable && (
                <NoteModel
                    showModal={showModal}
                    id={id}
                    onClose={closeModal}
                    title={noteData[0].title}
                    description={noteData[0].description}
                />
            )}
            <AddNotes />
            <div className="container my-3">
                <h2>Notes Summary</h2>
                <div className="row">
                    {data.map((ele) => (
                        <div className="col-md-4" key={ele._id}>
                            <Noteitem
                                onEdit={handleEditClick}
                                id={ele._id}
                                title={ele.title}
                                desc={ele.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Notes;
