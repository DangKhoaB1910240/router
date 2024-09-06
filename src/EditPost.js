import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
const EditPost = ({posts, editTitle, editBody, setEditTitle, setEditBody, handleEdit}) => {
    const { id } = useParams();
    const post = posts.find(post => post.id.toString() === id)
    console.log(post);
    useEffect(() => {
        if(post) {
            setEditBody(post.body)
            setEditTitle(post.title)
        }
    },[post, setEditBody, setEditTitle])
  return (
    <main>
      <h1>EditPost</h1>
      <form className='editPost' onSubmit={(e) => handleEdit(e, id)}>
        <input type="text" id="editTitle" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>
        <input type="text" id="editBody" value={editBody} onChange={(e) => setEditBody(e.target.value)}/>
        <button type="submit">ok</button>
      </form>
    </main>
  )
}

export default EditPost