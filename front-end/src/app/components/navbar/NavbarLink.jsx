import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarLink = ({children, to}) => {
  return (
    <NavLink to={to} className='text-sm text-white font-bold'>
      {children}
    </NavLink>
  );
};

export default NavbarLink;