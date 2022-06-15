import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({route, title}) => {
  return (
    <Link className='text-xl font-bold p-5 border-b-2 last-of-type:mb-5' to={route}>{title}</Link>
  )
}

export default Nav