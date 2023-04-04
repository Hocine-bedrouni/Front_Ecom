import React from 'react';
import { Link } from 'react-router-dom';

const CardMonCompte = ({item}) => {
    return (
        <Link to={item.to}>
        <div className='flex h-48 max-h-full px-5 display-flex border border-gray-300  gap-5 '>
            <div className=''>
            <img src="./img/ico_twitter.gif" alt="image" className='py-20'/>
            </div>
            <div className='py-10 text-size-18 w-full'>
            <span className='font-bold'>{item.titre}</span>
            <p className=' '>{item.text}</p>
            </div>
        </div>
        </ Link>
    );
};

export default CardMonCompte;