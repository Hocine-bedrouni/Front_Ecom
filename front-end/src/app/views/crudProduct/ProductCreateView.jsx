import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { URL_PRODUCTLIST } from '../../constants/urls/urlFrontEnd';
import Button from '../../components/Button';
import { addProduct } from '../../api/backend/account';
import apiBackEnd from '../../api/backend/api.Backend';



const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, "trop petit")
        .max(50, "trop long!")
        .required("Ce champ est obligatoire"),

    productDescription: Yup.string()
        .min(10, "trop petit")
        .max(200, "trop long!")
        .required("Ce champ est obligatoire"),

    priceTTC: Yup.number()
        .min(1, "trop petit")
        .max(5000, "trop long!")
        .positive()
        .required("Ce champ est obligatoire"),

    productInventory: Yup.number()
        .min(1, "trop petit")
        .max(500, "trop long!")
        .positive()
        .required("Ce champ est obligatoire"),

    categoryId: Yup.number()
        .min(1, "Catégorie à définir")
        .required("Ce champ est obligatoire"),
});

const initialValues = {
    name: "",
    productDescription: "",
    priceTTC: 0,
    productInventory: 0,
    categoryId: 0,
}

const ProductCreateView = () => {

    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([])


    useEffect(() => {
        apiBackEnd.get('no-role/all-category-dto')
            .then(response => {
                setCategoryList(response.data?.content)
            })
    }, []);

    const handleSubmit = (values) => {
        addProduct({
            ...values,
            'category': {
                'id': values.categoryId
            },
            'present': true
        })
            .then(() => {
                alert("votre produit a bien ete ajoute")
                navigate("/products-list")
            })
    };

    return (
        <div className='flex justify-center items-center min-h-full p-10'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className='font-manuale flex flex-col gap-5 border border-zinc-300 p-10 w-4/5 lg:w-1/3 text-dark'>
                    <h2 className='text-2xl text-center'>Ajout de produit</h2>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='name' className='text-sm font-normal'>Nom</label>
                        <Field name='name' type='text' className='border border-zinc-400' />
                        <ErrorMessage name='name'>
                            {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                        </ErrorMessage>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='productDescription' className='text-sm font-normal'>Description</label>
                        <Field name='productDescription' type='text' className='border border-zinc-400 ' />
                        <ErrorMessage name='productDescription'>
                            {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                        </ErrorMessage>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='priceTTC' className='text-sm font-normal'>Prix TTC</label>
                        <Field name='priceTTC' type='number' className='border border-zinc-400' />
                        <ErrorMessage name='priceTTC'>
                            {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                        </ErrorMessage>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='productInventory' className='text-sm font-normal'>Stock</label>
                        <Field name='productInventory' type='number' className='border border-zinc-400' />
                        <ErrorMessage name='productInventory'>
                            {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                        </ErrorMessage>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='categoryId' className='text-sm font-normal'>Catégorie</label>
                        <Field as='select' id='categoryId' name='categoryId'>
                            <option value={0} selected disabled hidden>Veuillez sélectionner une catégorie</option>
                            {categoryList?.map((category) => {
                                return (
                                    <option key={category.id} value={category.id} >
                                        {category.name}
                                    </option>
                                )
                            })}
                        </Field>
                        <ErrorMessage name='categoryId'>
                            {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                        </ErrorMessage>
                    </div>

                    <Button className='bg-dark border-0 text-white hover:bg-dark-light hover:text-white py-3 font-manuale text-sm font-normal mt-3'>Ajouter</Button>
                    <div className="flex w-full items-center text-dark">
                        <hr className="w-full border-zinc-400" />
                        <span className="mx-5 font-manuale text-sm">ou</span>
                        <hr className="w-full border-zinc-400" />

                    </div>
                    <button onClick={() => navigate(URL_PRODUCTLIST)} className="bg-dark border-0  text-white hover:bg-red-500 hover:text-white py-3 font-manuale text-sm font-normal mt-3">
                        Annuler
                    </button>
                </Form>
            </Formik>
        </div>
    );

};

export default ProductCreateView;