import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = ({posts, handleDelete}) => {
  const {id } = useParams();
  const post = posts.find(post => post.id.toString() === id);
  return (
    <main className='PostPage'>
      <article className='post'>
        { post && <><h2>{post.title}</h2><p className='postDate'>{post.datetime}</p> 
        
        <button onClick={() => handleDelete(post.id)}>Delete</button>
        
      <Link to={`/edit/${post.id}`} >Edit</Link>
        </>}
        { !post && 
        
          <><Link to="/">Về trang chủ đi ông nội</Link></>
        }
      </article>
    </main>
  )
}

export default PostPage