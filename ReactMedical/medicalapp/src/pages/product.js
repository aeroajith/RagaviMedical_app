import React from 'react'
import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <>
    <h2>Product Page</h2>
    <Link className='btn' to='/'> Back to Home
    </Link>
    </>
  )
}
