import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';
import { selectIsLogged, signOut } from '../../redux-store/authenticationSlice';

import { URL_HOME, URL_LOGIN, } from "../../constants/urls/urlFrontEnd";
import ico from "../../assets/img/ico_deconnexion.png"


const Nav2 = () => {
    const [navbar, setNavbar] = useState(false);
    const isLoggued = useSelector(selectIsLogged);
    const dispatch = useDispatch();
    const {cartTotalQuantity} = useSelector((state)=>state.cart);

    return (
        <nav className="w-full bg-orange-100 shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="">
                            <h2 className="text-2xl font-bold">LOGO</h2>
                        </a>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
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
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <NavLink to={URL_HOME} className={(navbar) => (navbar.isActive ? "navbar-active" : "")}>
                                <li>Accueil</li>
                            </NavLink>
                            <NavLink to="/about" className={(navbar) => (navbar.isActive ? "navbar-active" : "")}>
                                <li>à Propos</li>
                            </NavLink>
                            <NavLink to="/view" className={(navbar) => (navbar.isActive ? "navbar-active" : "")}>
                                <li>Crud_produit</li>
                            </NavLink>
                            <NavLink to="/user" className={(navbar) => (navbar.isActive ? "navbar-active" : "")}>
                                <li>Crud_user</li>
                            </NavLink>
                            <NavLink to="/cat">
                                <li><select className='sel_categorie bg-gray-300 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                    <option selected value="promo">Catégories</option>
                                    <option value="audio">Audio</option>
                                    <option value="video">Video</option>
                                    <option value="connectes">connectés</option>
                                </select></li>
                            </NavLink>
                            <NavLink to="/register" /*className={(navbar) => (navbar.isActive ? "navbar-active" : "")}*/>
                                <li>S'inscrire</li>
                            </NavLink>
                            <NavLink to="/connexion" >
                                <li><img src="src\app\assets\img\ico_login.png" alt="logo connexion" width="30" /></li>
                            </NavLink>
                            <NavLink to="/panier" >
                                <li><img src="src\app\assets\img\ico_panier.png" alt="logo panier" width="30" /></li>
                            </NavLink>


                            {isLoggued ? (
                                <Link to={URL_LOGIN}>
                                    <div className="link"><img src={ico} onClick={() => dispatch(signOut())} alt="logo deconnexion" id="deconnexion" width="30" />
                                    <span className='bag-quantity'>
                                        <span>{cartTotalQuantity}</span>
                                    </span>
                                    </div>
                                </Link>
                            ) : (
                                <>
                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}


export default Nav2;