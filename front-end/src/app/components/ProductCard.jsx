import React from 'react';
import { Link } from 'react-router-dom';
import { URL_PRODUCT_DETAILS } from '../constants/urls/urlFrontEnd';
import { addToCart } from '../redux-store/cartSlice';

const ProductCard = ({ className, product }) => {
  return (
    <div className=' flex xs:flex-col'>
      <Link
        to={"/product-detail/" + `${product.idProduct}`}
        className={`group ${className} bg-[url('../img/fond_carte_catégories.png')] bg-cover text-white text-center w-64 flex flex-col mx-auto`}
      >
        <h3 className="py-2 group-hover:translate-y-3 transition-all">
          {product.name}
        </h3>
        <img
          src="../img/huawei-sound-x-frandroid-2020 1.png"
          alt=""
          className="object-contain h-64"
        />
        <div className=' h-10'>{product.productDescription}</div>
        <span className="group-hover: text-orange-500 w-full block py-2 transition-all" o>
          Voir les Détails
        </span>
      </Link>
    </div>
  );
};

export default ProductCard;
