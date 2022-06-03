import React from 'react'
import Nav from './Nav'

const Navbar = () => {
  return (
    <nav>
      <Nav route="/" title="Home" />
      <Nav route="doctors" title="Doctors" />
      <Nav route="cases" title="Cases" />
      <Nav route="costs" title="Costs" />
      <Nav route="labs" title="Labs" />
      <Nav route="labs/1" title="Lab 1" />
    </nav>
  );
}

export default Navbar