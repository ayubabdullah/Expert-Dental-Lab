import React from 'react'
import Nav from './Nav'

const Navbar = () => {
  return (
    <nav className='flex flex-col items-center justify-center m-3 w-full rounded-xl bg-purple-300'>
      <Nav route="/" title="Home" />
      <Nav route="doctors" title="Doctors" />
      <Nav route="cases" title="Cases" />
      <Nav route="costs" title="Costs" />
      <Nav route="labs" title="Labs" />
    </nav>
  );
}

export default Navbar