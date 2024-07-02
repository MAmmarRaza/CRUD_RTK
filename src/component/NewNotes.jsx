import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNotes, newNotes } from '../features/newNotesSlicer';

export default function NewNotes() {
    // const [data, SetData]=useState([]);
    const data=useSelector((state)=>state.newNotes.notes);
    const loading=useSelector((state)=>state.newNotes.loading);
    const message=useSelector((state)=>state.newNotes.message);
    const [title, setTitle]=useState('');
    const [description, setDescription]=useState('');
    const [tag, setTag]=useState('');
    const [triggerFetch, setTriggerFetch]=useState(false);

    const dispatch=useDispatch();

    // useEffect(()=>{
    //     fetch('http://localhost:4000/fetchNotes')
    //     .then(response => response.json())
    //     .then(result=>SetData(result))
    // },[])

    useEffect(()=>{
        dispatch(newNotes());
        setTriggerFetch(false);
    },[triggerFetch]);

    const handleSubmit =(e)=>{
        e.preventDefault();
        dispatch(addNotes({title,description,tag})).then((result)=>{
            if(!result.error){
                setTriggerFetch(true);
            }
        });
    }
  return (
    <div>NewNotes
        <table>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Tag</th>
            </tr>
            {loading ? "loading...":data?.map((item, index)=>(
                <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.tag}</td>
                </tr>
            ))}
        </table>

        <form onSubmit={handleSubmit} >
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="title"/>
            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="description"/>
            <input type="text" value={tag} onChange={(e)=>setTag(e.target.value)} placeholder="tag"/>
            <button type='submit' disabled={loading}>{loading ? "loading...":"Submit"}</button>
        </form>
        {message}
    </div>
  )
}
