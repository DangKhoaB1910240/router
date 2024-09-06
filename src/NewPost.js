import React from 'react'

const NewPost = ({addTitle, addBody, setTitle, setBody, handleSubmit}) => {
  return (
    <main>
      <h1>NewPost</h1>
      <form className='addPost' onSubmit={(e) => handleSubmit(e)}>
        <input type="text" id="addTitle" value={addTitle} onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" id="addBody" value={addBody} onChange={(e) => setBody(e.target.value)}/>
        <button type="submit">ok</button>
      </form>
    </main>
  )
}

export default NewPost