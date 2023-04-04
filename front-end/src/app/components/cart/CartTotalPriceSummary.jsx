import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const CartTotalPriceSummary = () => {
  const { cartTotalAmount } = useSelector(state => state.cart);
  const { deliveryMode } = useSelector(state => state.delivery);
  
  return (
    <React.Fragment>
      <div className='flex justify-between '>
        <span>Total Produits :</span>
        <span>{new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(cartTotalAmount ?? 0)}</span>
      </div>
      <div className='flex justify-between'>
        <span>Frais de livraison estimés :</span>
        <span>{new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format((deliveryMode ? deliveryMode.price : 0))}</span>
      </div>
      <div className='flex justify-between text-2xl font-semibold'>
        <span>Total TTC :</span>
        <span>{new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format((deliveryMode ? deliveryMode.price : 0) + cartTotalAmount ?? 0)}</span>
      </div>
    </React.Fragment>
  )
}

export default CartTotalPriceSummary