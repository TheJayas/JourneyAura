// import React from 'react'
// import Home from "./Home"
import  { useState } from "react";
import { HoveredLink, Menu, MenuItem} from "./ui/navbar-menu";

const Navbar = () => {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div className="fixed top-6 inset-x-0 max-w-md mx-auto z-10">
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Trains">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/">Search Trains</HoveredLink>
              <HoveredLink href="/">Book Tickets</HoveredLink>
              <HoveredLink href="/">PNR Enquiry</HoveredLink>
              <HoveredLink href="/">Cancel Tickets</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Account">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/sign-in">Login</HoveredLink>
              <HoveredLink href="/sign-up">Register</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
    )
  }
  
  export default Navbar
  