import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { selectIsLogged } from '../redux-store/authenticationSlice';
import { URL_ACCOUNT, URL_LOGIN } from '../constants/urls/urlFrontEnd';
import { register, createAddress } from '../api/backend/account';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import RegisterInputs from '../components/RegisterInputs';
import AddressInputs from '../components/AddressInputs';
import axios from 'axios';

const RegisterView = () => {
    const navigate = useNavigate();
    const isLogged = useSelector(selectIsLogged);
    const [useDeliveryAddressAsBillingAddress, setUseDeliveryAddressAsBillingAddress] = useState('yes');

    useEffect(() => {
        if (isLogged)
            navigate(URL_ACCOUNT);
    }, [isLogged]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[a-zA-Z]([._](?![._])|[a-zA-Z]){4,30}[a-zA-Z]$/, 'nom incorrecte')
            .min(4, "Trop petit")
            .max(30, "Trop long!")
            .required("Ce champ est obligatoire"),
        firstName: Yup.string()
            .matches(/^[a-zA-Z]([._](?![._])|[a-zA-Z]){1,30}$/, 'prénom incorrecte' )
            .min(4, "Trop petit")
            .max(30, "Trop long!")
            .required("Ce champ est obligatoire"),
        email: Yup.string()
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'mauvaise adresse email')
            .email("E-mail invalide")
            .required("L'email est obligatoire"),
        civility: Yup.string().required('La civilité est obligatoire'),
        password: Yup.string()
            .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,128}$/, `Le mot de passe doit contenir au minimum:\n- 8 caractères\n- 1 majuscule\n- 1 minuscule\n- 1 chiffre\n- 1 caractère spécial\n- Pas d'espace !`)
            .required("Mot de passe est obligatoire"),
        confirmPassword: Yup.string()
            .required("Confirmation de mot de passe est obligatoire")
            .oneOf(
                [Yup.ref("password"), null],
                "Le mot de passe de confirmation ne correspond pas"
            ),
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

    const initialValues = {
        name: "",
        firstName: "",
        email: "",
        civility: "",
        password: "",
        confirmPassword: "",
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
    };

    const handleSubmit = (values) => {
        // On crée le compte 
        register({
            name: values.name,
            firstName: values.firstName,
            email: values.email,
            civility: values.civility,
            password: values.password
        })
            .then((res) => {
                const accountId = res.data.id

                // Si la création du compte est passé, alors on crée les adresses
                if (accountId) {

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

                    const deliveryAddressRequest = createAddress(accountId, deliveryAddress)
                    const billingAddressRequest = createAddress(accountId, billingAddress)

                    axios.all([deliveryAddressRequest, billingAddressRequest])
                        .then(res => {
                            toast.success('Votre compte a bien été créé.')
                            navigate(URL_LOGIN);
                        }).catch(() => {
                            toast.error('Erreur lors de la création du compte. Impossible de créer les adresses.');
                        })
                }
            })
            .catch(() => {
                toast.error('Erreur lors de la création du compte.');
            })
    };

    const onOptionChange = e => {
        setUseDeliveryAddressAsBillingAddress(e.target.value)
    }

    return (
        <div className='flex justify-center items-center min-h-full p-10'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className='font-manuale flex flex-col gap-5 border border-zinc-300 p-10 w-4/5 lg:w-1/3 text-dark'>
                    <h2 className='text-2xl text-center'>S'enregistrer</h2>
                    <RegisterInputs />
                    <hr className='border-dark' />
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

                    <Button className='bg-dark border-0 text-white hover:bg-dark-light hover:text-white py-3 font-manuale text-sm font-normal mt-3'>S'enregistrer</Button>
                </Form>
            </Formik>

        </div>
    );

}


export default RegisterView;