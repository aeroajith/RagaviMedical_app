import React from 'react'

import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
    <h2>About Page</h2>
    <Link className='btn' to='/'>  <button>Back to Home</button>
    </Link>
    </>
  )
}
