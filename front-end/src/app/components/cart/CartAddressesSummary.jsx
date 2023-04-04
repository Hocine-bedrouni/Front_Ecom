import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchAddresses } from '../../api/backend/account'
import useAddresses from '../../hooks/useAddresses';
import { selectUser } from '../../redux-store/authenticationSlice';
import CartAddressSummary from './CartAddressSummary'

const CartAddressesSummary = () => {
  const {loading, inError, inSuccess, deliveryAddress, billingAddress} = useAddresses();

  return (
    <div>
    {
      loading &&
      <div>
        Chargement des adresses...
      </div>
    }

    {
      inError &&
      <div>
        Impossible de charger les adresses...
      </div>
    } 

    {
      inSuccess &&
      <div className='flex flex-col gap-5'>
        <CartAddressSummary
          address={deliveryAddress}
          addressTitle='Adresse de livraison'
        />
        <CartAddressSummary
          address={billingAddress}
          addressTitle='Adresse de facturation'
        />
      </div>
    }
    </div>
  )
}

export default CartAddressesSummary