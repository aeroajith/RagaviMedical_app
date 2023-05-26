import React from 'react'

import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <>
    <h2>404</h2>
    <h4>Page Not Found</h4>
    <Link className='btn' to='/'
    >Back to Home</Link>
    </>
  )
}
