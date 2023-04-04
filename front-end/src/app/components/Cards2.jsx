import React from 'react';
import{useDispatch} from "react-redux"
import { addToCart } from '../redux-store/cartSlice'

import {useNavigate} from "react-router";

import image from '../assets/img/console.png';


const Cards2 = ({product}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAddToCart = (product) =>{
        dispatch(addToCart(product))
        navigate("/panier")
  }

        return (
            <div className="">
           
            <div className="rounded overflow-hidden shadow-lg">
              <img className="w-full" src={image} alt="Mountain"/>
              <div className="px-4 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">
                 {product.productDescription}.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Stock : {product.productInventory}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Réf : {product.refProduct}</span>
                <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Prix : {product.priceTTC} €</span>
              </div>
              <button onClick={()=>handleAddToCart(product)}>Add to Cart</button>
            </div>
          
           
          </div>
       
          );
};

export default Cards2;