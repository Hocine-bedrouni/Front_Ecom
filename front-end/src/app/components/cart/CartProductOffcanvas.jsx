import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { addToCart, decreaseCart, removeFromCart } from '../../redux-store/cartSlice';

const CartProductOffcanvas = ({product}) => {
  const dispatch = useDispatch();
  
  return (
    <div className='flex items-center text-white font-manuale h-24 gap-3'>
      <img 
        src={product.pictures[0]?.url} 
        alt={product.description} 
        className='w-24 h-24 object-contain object-center'/>
      <div className='flex flex-col justify-between h-full py-2 w-64 flex-grow'>
        <div>{product.name}</div>
        {
        !product.present ? 
          <div className='text-red-500 place-self-end'>
          <p>Ce produit n'est plus disponible à la vente.</p>
          <p className ="underline font-bold hover:text-red-300" onClick={() => dispatch(removeFromCart(product))}>Cliquez ici pour le supprimer</p>
          </div> :
          <div className='flex gap-1 items-center'>
            <span>Qté</span>
            <button onClick={() => dispatch(decreaseCart(product))}><ChevronLeftIcon className='w-6'/></button>
            <span className='w-8 text-center'>{product.cartQuantity}</span>
            <button onClick={() => dispatch(addToCart(product))}><ChevronRightIcon className='w-6'/></button>
          </div>
        }
      </div>
      {
      product.present ??
        <div className='flex flex-col h-full justify-end items-end py-2 gap-1'>
          <button onClick={() => dispatch(removeFromCart(product))}>
            <XIcon className='w-8' />
          </button>
          <span className=''>{new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(product.priceTTC)}</span>
        </div>
      }
    </div>
  );
};

export default CartProductOffcanvas;