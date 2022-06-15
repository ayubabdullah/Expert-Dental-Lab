import React from 'react'
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="flex justify-center items-center flex-col fixed w-1/6 top-0 left-0">
      <h1 className="font-extrabold text-5xl text-center">Expert Dental Lab</h1>
      <Navbar />
    </header>
  );
}

export default Header