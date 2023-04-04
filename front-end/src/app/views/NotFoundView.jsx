import React from 'react'
import { Link } from 'react-router-dom';
import { URL_HOME } from '../constants/urls/urlFrontEnd';

export const NotFoundView = () => {
  return (
    <div className="relative">
    {/* <div className=" w-full h-screen  bg-cover bg-[url('../img/notFound.png')] pt-[150px] pl-[20px] max-md:pl-[10px]"> */}

    <img src='../img/notFound.png'/>

    <div className=" absolute top-[175px] left-[40px] max-sm:top-[50px] max-sm:left-[10px] ">
        <div className="">
            <h1 className='font-bold text-[89px] max-md:text-[40px] max-sm:text-[25px]  '>OOOPS...</h1>
            <h1 className='font-bold text-[43px] max-md:text-[20px] max-sm:text-[12px] mb-2 uppercase'>page non trouvée</h1>
        </div>

        {/* <div className="paragr  max-md:text-sm  max-sm:text-[10px]"> */}
                <p className=' min-md:text-[15px] max-sm:text-[7px] mb-5'>
                Page non trouvée
                La page que vous recherchez est inexistante <br/>ou une autre erreur s'est produite, retournez à la <br/>page d'accueil.

                </p>
        {/* </div> */}
        <Link to={URL_HOME}>
        <button className=" text-white font-rubik bg-dark uppercase   max-sm:text-[7px]">
            page d'accueil
    </button>
    </Link>
</div>

    
    </div>
  )
}
