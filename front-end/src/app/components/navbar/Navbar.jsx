import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectHasRole, selectIsLogged } from "../../redux-store/authenticationSlice";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux-store/authenticationSlice";
import { close, menu } from '../../assets';
import "../../index.css"
import {
  URL_ABOUT,
  URL_ACCOUNT,
  URL_CART,
  URL_HOME,
  URL_LOGIN,
  URL_MY_ACCOUNT,
  URL_PRODUCT,
  URL_PRODUCTLIST,
  URL_PRODUCT_DETAILS,
  URL_PRODUCT_NEW,
  URL_PRODUCT_PROMOTION,
  URL_REGISTER,
  URL_USER_LIST
} from "../../constants/urls/urlFrontEnd";
import NamedLogo from "../svg/NamedLogo";
import NavbarLink from "./NavbarLink";
import ProfilIcon from "../svg/ProfilIcon";
import CartIcon from "../svg/CartIcon";
import { Menu } from "@headlessui/react";
import { ROLE_ADMIN } from "../../constants/rolesConstant";
import CartOffcanvas from "../cart/CartOffcanvas";
import apiBackEnd from "../../api/backend/api.Backend";
import { getTotals } from "../../redux-store/cartSlice";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const isLogged = useSelector(selectIsLogged);
  const isAdmin = useSelector((state) => selectHasRole(state, [ROLE_ADMIN]))
  const { cartItems, cartTotalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [showCartOffcanvas, setShowCartOffcanvas] = useState(false);


  useEffect(() => {

    dispatch(getTotals());
  }, [cartItems]);



  const handleToggleCartOffcanvas = (show) => {
    setShowCartOffcanvas(prevValue => show ?? !prevValue);
  }

  return (
    <nav className={`flex items-center justify-between w-full px-8 lg:px-16 py-2 z-30 ${pathname !== URL_HOME ? 'bg-dark' : 'absolute'}`}>
      <div className='flex items-center gap-7 '>
        {/* Menu pour format smole*/}

        <div className='sm:hidden flex flex-1 justify-end items-center z-10'>
          <img src={toggle ? close : menu}
            alt="menu"
            className='w-[28px] h-[28px]
        object-contain   mr-auto '
            onClick={() => setToggle((prev) => !prev)} />
          <div
            className={`${toggle ? 'flex' : 'hidden'}   p-6 bg-primary  text-dark absolute top-20 left-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className='list-none flex flex-col  justify-end items-center flex-1'>
              <li className={`font-poppins font-normal cursor-pointer 
              text-[16px] mb-4
              `} onClick={() => setToggle((prev) => !prev)}><NavbarLink to={URL_PRODUCT_NEW}>NOUVEAUTÉS</NavbarLink></li>
              <li className={`font-poppins font-normal cursor-pointer 
              text-[16px] mb-4
              `} onClick={() => setToggle((prev) => !prev)}>  <NavbarLink to={URL_PRODUCT_PROMOTION}>PROMOTIONS</NavbarLink></li>
              <li className={`font-poppins font-normal cursor-pointer 
              text-[16px] mb-4
              `} onClick={() => setToggle((prev) => !prev)}>     <NavbarLink to={URL_PRODUCT}>NOS&nbsp;PRODUITS</NavbarLink></li>
              <li className={`font-poppins font-normal cursor-pointer 
              text-[16px] mb-4
              `} onClick={() => setToggle((prev) => !prev)}>   <NavbarLink to={URL_ABOUT}>À&nbsp;PROPOS</NavbarLink></li>

            </ul>

          </div>

        </div>
        {/* Menu pour format smole  fin*/}
        <div>
          <NavbarLink to={URL_HOME}>
            <NamedLogo />
          </NavbarLink>
        </div>

        <div className='list-none sm:flex hidden flex-1 gap-5 '>
          <NavbarLink to={URL_PRODUCT_NEW}>NOUVEAUTÉS</NavbarLink>

          <NavbarLink to={URL_PRODUCT_PROMOTION}>PROMOTIONS</NavbarLink>
          <NavbarLink to={URL_PRODUCT}>NOS&nbsp;PRODUITS</NavbarLink>
          <NavbarLink to={URL_ABOUT}>À&nbsp;PROPOS</NavbarLink>
        </div>
      </div>
      <div className='flex gap-7'>
        <button to={URL_CART} className='relative group' onClick={handleToggleCartOffcanvas}>
          {cartTotalQuantity > 0 &&
            <span className='absolute bg-red-500 text-center text-white rounded-full text-xs -right-3 -top-2 px-1'>
              {cartTotalQuantity}
            </span>
          }
          <CartIcon />
        </button>
        <Menu>
          <Menu.Button>
            <ProfilIcon />
          </Menu.Button>
          <Menu.Items className='absolute top-16 right-4 z-10'>
            <div className='bg-dark text-white w-max flex flex-col rounded overflow-hidden border border-dark-dark font-manuale'>
              {isLogged ?
                <>
                  <Menu.Item as={Link} to={URL_MY_ACCOUNT} className='hover:bg-dark-light px-3 py-1'>Mon compte
                  </Menu.Item>
                  {isAdmin &&
                    <>
                      <hr className='border-dark-dark mx-2' />
                      <Menu.Item as={Link} to={URL_USER_LIST} className='hover:bg-dark-light px-3 py-1'>
                        Utilisateurs
                      </Menu.Item>
                      <hr className='border-dark-dark mx-2' />
                      <Menu.Item as={Link} to={URL_PRODUCTLIST} className='hover:bg-dark-light px-3 py-1'>
                        Produits
                      </Menu.Item>
                    </>

                  }
                  <hr className='border-dark-dark mx-2' />
                  <Menu.Button className='text-red-500 hover:bg-dark-light px-3 py-1' onClick={() => dispatch(signOut())}>
                    Se déconnecter
                  </Menu.Button>
                </>
                :
                <>
                  <Menu.Item as={Link} to={URL_LOGIN} className='hover:bg-dark-light px-3 py-1'>Se connecter</Menu.Item>
                  <hr className='border-dark-dark mx-2' />
                  <Menu.Item as={Link} to={URL_REGISTER} className='hover:bg-dark-light px-3 py-1'>S'enregistrer</Menu.Item>
                </>
              }
            </div>
          </Menu.Items>
        </Menu>
      </div>
      <CartOffcanvas show={showCartOffcanvas} setShow={handleToggleCartOffcanvas} />

    </nav>
  );
};

export default Navbar;
