import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux-store/authenticationSlice';
import AddressInputs from '../components/AddressInputs';
import { createAddress, fetchAddresses, updateAddress } from '../api/backend/account';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { URL_MY_ACCOUNT } from '../constants/urls/urlFrontEnd';



const AddressUpdateView = () => {
    const user = useSelector((state) => selectUser(state));
    const navigate = useNavigate();
    const [currentDeliveryAddress, setCurrentDeliveryAddress] = useState()
    const [currentBillingAddress, setCurrentBillingAddress] = useState()
    const [useDeliveryAddressAsBillingAddress, setUseDeliveryAddressAsBillingAddress] = useState('yes');
    

    const [initialValues, setInitialValues] = useState(
    {
        deliveryAddress: {
            postalCode: "",
            city: "",
            street: ""
        },
        billingAddress: {
            postalCode: "",
            city: "",
            street: ""
        }
    })

    const validationSchema = Yup.object().shape({
        deliveryAddress: Yup.object({
            postalCode: Yup.string()
                .required("Le code postal est obligatoire")
                .matches(/^[0-9]+$/, "Le code postql ne doit contenir que des chiffres")
                .min(5, "Le code postal doit contenir 5 chiffres")
                .max(5, "Le code postal doit contenir 5 chiffres"),
            city: Yup.string()
                .required("La ville est obligatoire")
                .min(1, "Trop petit")
                .max(50, "Trop long"),
            street: Yup.string()
                .required("La ville est obligatoire")
                .min(1, "Trop petit")
                .max(50, "Trop long")
        }),
        billingAddress: Yup.object().when([], {
            is: () => useDeliveryAddressAsBillingAddress === 'no',
            then: Yup.object().shape({
                postalCode: Yup.string()
                    .required("Le code postal est obligatoire")
                    .matches(/^[0-9]+$/, "Le code postql ne doit contenir que des chiffres")
                    .min(5, "Le code postal doit contenir 5 chiffres")
                    .max(5, "Le code postal doit contenir 5 chiffres"),
                city: Yup.string()
                    .required("La ville est obligatoire")
                    .min(1, "Trop petit")
                    .max(50, "Trop long"),
                street: Yup.string()
                    .required("La ville est obligatoire")
                    .min(1, "Trop petit")
                    .max(50, "Trop long")
            })
        }),
    });

    useEffect(() => {
        // Chargement des adresses de livraison et facturation existantes
        fetchAddresses(user.id).then(res => {
            const addresses = res.data;
            const deliveryAddress = addresses.find(address => address.type === 'DELIVERY' && address.active)
            const billingAddress = addresses.find(address => address.type === 'BILLING' && address.active)
            setCurrentDeliveryAddress(deliveryAddress)
            setCurrentBillingAddress(billingAddress)

            if(deliveryAddress) {
                setInitialValues(prev => ({
                    ...prev,
                    deliveryAddress: {
                        postalCode: deliveryAddress.postalCode,
                        city: deliveryAddress.city,
                        street: deliveryAddress.street
                    }
                }))
            }

            if(billingAddress) {
                setInitialValues(prev => ({
                    ...prev,
                    billingAddress: {
                        postalCode: billingAddress.postalCode,
                        city: billingAddress.city,
                        street: billingAddress.street
                    }
                }))
            }

            // Si l'adresse de livraison est utilisée comme adresse de facturation
            // Alors sélectionner le choix 'oui'
            // Sinon sélectionner le choix 'non'
            if(deliveryAddress?.postalCode === billingAddress?.postalCode
                && deliveryAddress?.city === billingAddress?.city
                && deliveryAddress?.street === billingAddress?.street) {
                setUseDeliveryAddressAsBillingAddress('yes')
            } else {
                setUseDeliveryAddressAsBillingAddress('no')
            }
          }).catch(() => {
            toast.error('Erreur lors du chargement des données.');
          })
      }, [])

    const handleSubmit = (values) => {
        const deliveryAddress = {
            type: "DELIVERY",
            street: values.deliveryAddress.street,
            city: values.deliveryAddress.city,
            postalCode: values.deliveryAddress.postalCode,
            active: true
        }

        const billingAddress = useDeliveryAddressAsBillingAddress === 'yes' ?
            {
                type: "BILLING",
                street: values.deliveryAddress.street,
                city: values.deliveryAddress.city,
                postalCode: values.deliveryAddress.postalCode,
                active: true
            } :
            {
                type: "BILLING",
                street: values.billingAddress.street,
                city: values.billingAddress.city,
                postalCode: values.billingAddress.postalCode,
                active: true
            }
       
        let deliveryAddressRequest;
        let billingAddressRequest;

        if(currentDeliveryAddress) {
            deliveryAddressRequest = updateAddress(user.id, currentDeliveryAddress.id, deliveryAddress)
        } else {
            deliveryAddressRequest = createAddress(user.id, deliveryAddress)
        }

        if(currentBillingAddress) {
            billingAddressRequest = updateAddress(user.id, currentBillingAddress.id, billingAddress)
        } else {
            billingAddressRequest = createAddress(user.id, billingAddress)
        }

        axios.all([deliveryAddressRequest, billingAddressRequest])
        .then(res => {
            toast.success('Les adresses ont bien été modifiées')
            navigate(URL_MY_ACCOUNT)
        }).catch(() => {
            toast.error('Erreur lors de la mise à jour des adresses');
        })

    }

    const onOptionChange = e => {
        setUseDeliveryAddressAsBillingAddress(e.target.value)
    }


    return (
        <div className='flex justify-center items-center min-h-full p-10'>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
            <Form className='font-manuale flex flex-col gap-5 border border-zinc-300 p-10 w-4/5 lg:w-1/3 text-dark'>
                <h6 className='font-bold text-center'>Mon adresse de livraison</h6>
                <AddressInputs
                    postalCodeFieldName='deliveryAddress.postalCode'
                    cityFieldName='deliveryAddress.city'
                    streetFieldName='deliveryAddress.street'
                />

                <div className='flex items-center gap-5'>
                    <label htmlFor='useDeliveryAddressAsBillingAddress' className='text-sm font-normal'>Utiliser comme adresse de facturation</label>
                    <div className='flex items-center gap-1'>
                        <input id='yes' type='radio' name='useDeliveryAddressAsBillingAddress' value='yes'
                            className='text-dark'
                            onChange={onOptionChange}
                            checked={useDeliveryAddressAsBillingAddress === 'yes'}
                        />
                        <label htmlFor='yes' className='text-sm font-normal'>Oui</label>
                    </div>
                    <div className='flex items-center gap-1'>
                        <input id='no' type='radio' name='useDeliveryAddressAsBillingAddress' value='no' className='text-dark' onChange={onOptionChange}
                            checked={useDeliveryAddressAsBillingAddress === 'no'} />
                        <label htmlFor='yes' className='text-sm font-normal'>Non</label>
                    </div>
                </div>

                {
                    useDeliveryAddressAsBillingAddress === 'no' ?
                        <React.Fragment>
                            <h6 className='font-bold text-center'>Mon adresse de facturation</h6>
                            <AddressInputs
                                postalCodeFieldName='billingAddress.postalCode'
                                cityFieldName='billingAddress.city'
                                streetFieldName='billingAddress.street'
                            />
                        </React.Fragment>
                        : null
                }

                <Button className='bg-dark border-0 text-white hover:bg-dark-light hover:text-white py-3 font-manuale text-sm font-normal mt-3'>Modifier</Button>
            </Form>
        </Formik>

    </div>
    )
};

export default AddressUpdateView;