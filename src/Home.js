import React from 'react'
import Fee from './Fee'

const Home = ({posts}) => {
  console.log(posts.length);
  return (
    <main className='Home'>
      {posts.length ? <Fee posts={posts}/> : <p>Không có post nào hết</p>}
    </main>
  )
}

export default Home