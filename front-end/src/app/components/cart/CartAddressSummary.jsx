import React, { useState } from 'react'
import { useEffect } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AddressInputs from '../AddressInputs';
import Button from '../Button';
import { Link, useNavigate } from 'react-router-dom';
import { URL_ADDRESS_UPDATE } from '../../constants/urls/urlFrontEnd';
import { add } from 'date-fns';


const CartAddressSummary = ({address, addressTitle}) => {
  return (
    <React.Fragment>
      {address ?  
        <div className='flex flex-col gap-1'>
          <h1 className='font-bold'>
            {addressTitle} 
            (<Link to={URL_ADDRESS_UPDATE} className='font-medium text-blue-600 dark:text-blue-500 hover:underline' >modifier</Link>)
          </h1>
          <p>{address.street}</p>
          <p>{address.city}</p>
          <p>{address.postalCode}</p>
        </div>
          :
        <div className='flex flex-col gap-1'>
          <h1 className='font-bold'>
            {addressTitle} 
          </h1>
          <Link to={URL_ADDRESS_UPDATE} className='font-medium text-blue-600 dark:text-blue-500 hover:underline' >Créer une adresse</Link>
        </div>
        }
    </React.Fragment>
  )
}

export default CartAddressSummary