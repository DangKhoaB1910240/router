import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({search, setSearch}) => {
  return (
    <nav>
        <form>
          <label htmlFor="search">Search Posts</label>
          <input type="text" value ={search} onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/post">Post</Link>
            <Link to="/about">About</Link>
          </li>
        </ul>
    </nav>
  )
}

export default Nav