import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarLink = ({link}) => {
  return (
    <NavLink to={link.path} className="text-base font-semibold leading-6 uppercase py-1 px-2 rounded text-[#878787]">
        {link.name}
    </NavLink>
  )
}

export default NavbarLink