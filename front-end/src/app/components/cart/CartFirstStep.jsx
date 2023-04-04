import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL_HOME } from '../../constants/urls/urlFrontEnd';
import { addToCart, decreaseCart, fetchProducts, removeFromCart } from '../../redux-store/cartSlice';
import CartTotalPriceSummary from './CartTotalPriceSummary';

const CartFirstStep = ({ setStep }) => {
  const { cartItems, loadingProducts } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(cartItems));
  }, []) 

  return (
    <div className='flex justify-around items-start container mx-auto'>
      {!loadingProducts && cartItems.length > 0 ?
        <table className='text-manuale table-auto'>
          <thead className='text-rubik bg-zinc-100 mb-10'>
            <tr className='h-8'>
              <th className='w-32'>Photo</th>
              <th className='w-96'>Désignation</th>
              <th className='w-48'>Quantité</th>
              <th className='w-36'>Prix unitaire</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map(product => {
              return (
              <tr key={product.idProduct}>
                <td className='py-3 flex'>
                  <img src={product.pictures[0]?.url} className='w-32 h-32 object-contain'/>
                </td>
                <td className='px-3 text-ellipsis max-w-lg overflow-hidden whitespace-nowrap'>
                  {product.productDescription}
                </td>
                {
                !product.present ? 
                <td colSpan='2'>
                  <div className='text-red-500 place-self-end'>
                  <p>Ce produit n'est plus disponible à la vente.</p>
                  <p className ="underline font-bold hover:text-red-300" onClick={() => dispatch(removeFromCart(product))}>Cliquez ici pour le supprimer</p>
                  </div>
                </td> :
                <React.Fragment>
                  <td>
                    <div className='flex justify-center items-center h-full text-center'>
                      <button className='border rounded-l' onClick={() => dispatch(decreaseCart(product))}>
                        <MinusIcon className='w-6' />
                      </button>
                      <span className='inline-block border-y w-12'>{product.cartQuantity}</span>
                      <button className='border rounded-r' onClick={() => dispatch(addToCart(product))}>
                        <PlusIcon className='w-6' />
                      </button>
                    </div>
                  </td>
                  <td className='text-right pr-3'>
                    {new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(product.priceTTC)}
                  </td>
                </React.Fragment>
                }
              </tr>)
            }
            )}
          </tbody>
        </table>
      :
      <h2 className='text-xl text-center flex-grow'>Vous n'avez pas d'article dans votre panier</h2>
      }
      <div className='bg-zinc-100 p-10 flex flex-col gap-5 w-96 font-manuale'>
        <div>
          Votre commande sera livrée chez vous <strong>sous 7 jours.</strong>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-5'>
            <span>Je bénéficie d'un code promo</span>
            <div className='flex'>
              <input type='text' className='flex-grow' placeholder='Entrez votre code promo'/>
              <button className='bg-dark-dark hover:bg-dark-light text-white p-3'>OK</button>
            </div>
            <hr />
            <CartTotalPriceSummary/>
            <button disabled={cartItems.find(product => !product.present)} className='bg-dark-dark enabled:hover:bg-dark-light text-white p-3 disabled:opacity-50' onClick={() => setStep(prevStep => prevStep
              + 1)}>Continuer ma commande</button>
            <Link to={URL_HOME} className='text-center p-3'>{`< Continuer mon shopping`}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartFirstStep;