// import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';
import { BackgroundBeams } from './ui/background-beams';
import Home from './Home';

const Layout = () => {
  return (
    <>
    {/* <CssBaseline/> */}
    <Navbar/>
    <Outlet/>
    {/* <BackgroundBeams/> */}
    {/* <Home/> */}
  </>
  )
}

export default Layout
