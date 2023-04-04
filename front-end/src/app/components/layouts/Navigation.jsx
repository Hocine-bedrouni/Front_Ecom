import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';
import { selectIsLogged, signOut } from '../../redux-store/authenticationSlice';


import {
    URL_LOGIN,
    URL_REGISTER
} from "../../constants/urls/urlFrontEnd";

const Navigation = () => {

    const isLoggued = useSelector(selectIsLogged);
    const dispatch = useDispatch();

    const [navbar, setNavbar] = useState(false);

    return (
        <div className='navbar bg-gray-300'>
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div  className="flex items-center justify-between py-3 md:py-5 md:block">
                    <h2 className="text-2xl font-bold">LOGO</h2>
                        <div  className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}>
                            <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <ul>
                            <NavLink to="/test" className={(navbar) => (navbar.isActive ? "navbar-active" : "")}>
                                <li>Accueil</li>
                            </NavLink>
                            <NavLink to="/about" className={(navbar) => (navbar.isActive ? "navbar-active" : "")}>
                                <li>à Propos</li>
                            </NavLink>
                            <NavLink to="/view" className={(navbar) => (navbar.isActive ? "navbar-active" : "")}>
                                <li>Crud_produit</li>
                            </NavLink>
                            <NavLink to="/cat">
                                <li><select className='sel_categorie bg-gray-300'>
                                    <option selected value="promo">Promos</option>
                                    <option value="audio">Audio</option>
                                    <option value="video">Video</option>
                                    <option value="connectes">connectés</option>
                                </select></li>
                            </NavLink>
                            <NavLink to="/register" className={(navbar) => (navbar.isActive ? "navbar-active" : "")}>
                                <li>S'inscrire</li>
                            </NavLink>
                            <NavLink to="/connexion" >
                                <li><img src="src\app\assets\img\ico_login.png" alt="logo connexion" width="30" /></li>
                            </NavLink>
                            <NavLink to="/panier" >
                                <li><img src="src\app\assets\img\ico_panier.png" alt="logo panier" width="30" /></li>
                            </NavLink>


                            {isLoggued ? (
                                <button onClick={() => dispatch(signOut())} className="btn btn h-10 w-20 mr-2" ></button>
                            ) : (
                                <>
                                    <Link to={URL_LOGIN}>
                                        <div className="link"><img src="src\app\assets\img\ico_deconnexion.png" alt="logo deconnexion" id="deconnexion" width="30" /></div>
                                    </Link>
                                    {/* <Link to={URL_REGISTER}>
                  <button className="btn btn-green">Sign up</button>
                </Link>{" "} */}
                                </>
                            )}

                        </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navigation;