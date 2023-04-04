import React from 'react';
import NamedLogo from '../svg/NamedLogo';
import NavbarLink from '../navbar/NavbarLink';

//TODO
const Footer = () => {
  return (
    <div className='flex items-center bg-dark px-20 justify-between pr-36 h-48'>
      <div>
        <NamedLogo />
      </div>
      <div className='flex items-center gap-5'>
        <NavbarLink to='/help'>
          AIDE
        </NavbarLink>
        <NavbarLink to='/help'>
          FAQ
        </NavbarLink>
        <NavbarLink to='/help'>
          MENTIONS&nbsp;LÉGALES
        </NavbarLink>
        <NavbarLink to='/help'>
          CONTACT
        </NavbarLink>
        <NavbarLink to='/help'>
          À&nbsp;PROPOS
        </NavbarLink>
      </div>
    </div>
  );
};

export default Footer;