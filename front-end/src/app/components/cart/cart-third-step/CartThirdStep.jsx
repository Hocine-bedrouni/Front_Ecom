import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllDeliveryModes } from '../../../api/backend/deliveryMode';
import { selectIsLogged } from '../../../redux-store/authenticationSlice';
import { setDeliveryMode } from '../../../redux-store/deliverySlice';
import CheckIcon from '../../svg/CheckIcon';
import CartAddressesSummary from '../CartAddressesSummary';
import CartProductListSummary from '../CartProductListSummary';
import CartTotalPriceSummary from '../CartTotalPriceSummary';
import useAddresses from '../../../hooks/useAddresses';
import { DELIVERY_MODES } from './DeliveryModes';

const CartThirdStep = ({ setStep }) => {
  const isLogged = useSelector((state) => selectIsLogged(state));
  const [deliveryModes, setDeliveryModes] = useState([])
  const [loading, setLoading] = useState(true)
  const {deliveryAddress, billingAddress} = useAddresses();

  const {deliveryMode} = useSelector(state => state.delivery)

  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState(
  {
    'deliveryModeName': ''
  })
  
  useEffect(() => {
    if (!isLogged) {
      setStep(1)
    } else {
      setLoading(true)
      getAllDeliveryModes()
        .then(res => { 
          setDeliveryModes(res.data)
          if(deliveryMode) {
            setInitialValues({
              'deliveryModeName': deliveryMode.name
            }) 
          }
        })
        .finally(setLoading(false))
    }
  }, [isLogged])

  const handleSubmit = (values) => {
    dispatch(setDeliveryMode(deliveryModes.find(deliveryMode => deliveryMode.name === values.deliveryModeName)))
    setStep(prevStep => prevStep + 1)
  }

  const isDisabledSubmitButton = () => {
    return !deliveryMode || !billingAddress || !deliveryAddress
  }

  return (
    <div className="container mx-auto">
      <h1 className='text-2xl font-bold text-center pb-10'>Choix du mode de livraison</h1>
      <div className='flex flex-col md:flex-row md:justify-around md:items-start'>
        {loading && <div>Chargement des modes de livraisons...</div>}
        {!loading && deliveryModes.length > 0 &&
          <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
            <Form className='flex flex-col md:w-1/4 gap-5'>
              <Field name='deliveryModeName'>
                {({ field }) => {
                  return deliveryModes
                  // trie les modes de livraison
                  .sort((a, b) => DELIVERY_MODES.findIndex(mode => mode.name === a.name) - DELIVERY_MODES.findIndex(mode => mode.name === b.name))
                  .map(deliveryMode =>
                    <div className='border border-dark border-solid rounded p-5 bg-zinc-100 font-manuale' key={deliveryMode.name}>
                      <input
                        type='radio'
                        id={deliveryMode.name}
                        {...field}
                        value={deliveryMode.name}
                        checked={field.value === deliveryMode.name}
                        onChange={e => {
                          dispatch(setDeliveryMode(deliveryMode))
                          field.onChange(e)
                        }}
                        className='focus:outline-none focus:ring-dark focus:border-dark text-dark'
                      />
                      <div className='space-y-1 pl-2'>
                        <div className='flex flex-row justify-between'>
                          <label
                            className='font-bold'
                            htmlFor={deliveryMode.name}>
                            { DELIVERY_MODES.find(mode => mode.name === deliveryMode.name)?.label ?? deliveryMode.name }
                          </label>
                          <div className="font-bold text-base">
                            {
                              deliveryMode.price > 0 ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(deliveryMode.price) :
                              "Gratuit"
                            }
                          </div>
                        </div>
                        <ul className='space-y-1'>
                          {
                            DELIVERY_MODES.find(mode => mode.name === deliveryMode.name)?.descriptionLines?.map(line =>                                                       
                              <li className="flex items-start gap-1">
                                <CheckIcon />
                                <p className='relative bottom-1'>{line}</p>
                              </li>
                            )
                          } 
                        </ul>
                      </div>
                    </div>
                  )
                }
                }
              </Field>
              { 
                isDisabledSubmitButton() && 
                  <span className='text-red-500 text-sm'>Veuillez sélectionner un mode de livraison et indiquer vos adresses de livraison et de facturation</span>
              }
              <button disabled={isDisabledSubmitButton()} className='bg-dark-dark enabled:hover:bg-dark-light text-white p-3 disabled:opacity-50'>Valider</button>
            </Form>
          </Formik>
        }
        <div className='flex flex-col md:w-1/4 p-10 gap-5 bg-zinc-100 font-manuale'>
          <CartProductListSummary />
          <hr />
          <CartTotalPriceSummary />
          <hr />
          <CartAddressesSummary />
        </div>
      </div>
    </div>
  )
}

export default CartThirdStep