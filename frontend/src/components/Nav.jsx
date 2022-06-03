import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({route, title}) => {
  return (
    <Link to={route}>{title}</Link>
  )
}

export default Nav