import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({className, category}) => {
  return (
    <Link to={`/category/${category.id}`} className={`group ${className} bg-[url('./img/fond_carte_catégories.png')] bg-cover text-white text-center w-64 flex flex-col mx-auto`}>
      <h3 className='py-2 group-hover:translate-y-3 transition-all'>{category.name}</h3>
      <img src={category.url ?? 'img/Pexels Photo by Vishven Solanki-1.png'} alt='' className='object-contain h-64'/>
      <span className='group-hover:bg-dark w-full block py-2 transition-all'>Découvrez</span>
    </Link>
  );
};

export default CategoryCard;