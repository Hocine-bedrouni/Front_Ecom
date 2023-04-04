import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL_CART } from '../../constants/urls/urlFrontEnd';
import Offcanvas from '../Offcanvas';
import CartProductOffcanvas from './CartProductOffcanvas';
import Button from '../Button';
import { fetchProducts } from '../../redux-store/cartSlice';

const CartOffcanvas = ({show, setShow}) => {
  const { cartItems, cartTotalAmount, loadingProducts } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    // Rafraichir la liste des produits à chaque rendu du canvas
    if(show) {
      dispatch(fetchProducts(cartItems))
    }
  }, [show])
  

  const closeOffcanvas = () => {
    setShow(false);
  }
  
  return (
    <Offcanvas className='inline-block md:flex z-10' show={show}>
      <div className='flex-grow bg-opacity-75 bg-zinc-400' onClick={closeOffcanvas}></div>
      <div className='p-5 flex flex-col gap-3 justify-between bg-dark-light h-full'>
        <div className='flex flex-col flex-grow overflow-auto'>
          <button className='relative ml-auto mr-5 my-5 text-white font-manuale font-normal' onClick={closeOffcanvas}>Fermer</button>
          {!loadingProducts && cartItems?.length ?
            <div className='overflow-auto'>
              {cartItems?.map(product => 
                <div key={product.idProduct} className='flex flex-col gap-3 mb-3'>
                  <hr className='border-zinc-500'/>
                  <CartProductOffcanvas product={product}/>
                </div>
              )}
            </div>
            :
            <div className='text-white font-manuale'>
              <span>Vous n'avez pas encore d'article</span>
            </div>
          }
        </div>
        <div className='text-white font-manuale'>
          <hr className='border-zinc-500'/>
          <div className='flex justify-between my-4'>
            <span>Sous-total</span>
            <span>{new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(cartTotalAmount)}</span>
          </div>
          <hr className='border-zinc-500'/>
          <div className='flex flex-col gap-5 my-7'>
            <Link to={URL_CART} onClick={closeOffcanvas} className='bg-dark-dark hover:bg-dark text-center px-7 py-2 transition-colors font-medium font-manuale'>
              Voir mon panier
            </Link>
            <Button onClick={closeOffcanvas} className='border-white text-white hover:bg-white font-manuale'>
              Continuer mon shopping
            </Button>
          </div>
        </div>
      </div>
    </Offcanvas>
  );
};

export default CartOffcanvas;