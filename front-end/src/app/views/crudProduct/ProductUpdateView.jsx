import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import apiBackEnd from '../../api/backend/api.Backend';
import { updateProduct } from '../../api/backend/account';


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
        .max(300, "trop long!")
        .positive()
        .required("Ce champ est obligatoire"),

    categoryId: Yup.number()
        .min(1, "Catégorie à définir")
        .required("Ce champ est obligatoire"),


});





const ProductUpdateView = ({ product, setIsupdate }) => {
    const navigate = useNavigate();

    const [categoryList, setCategoryList] = useState([]);

    const initialValues = {
        id: product.idProduct,
        name: product.name,
        productDescription: product.productDescription,
        priceTTC: product.priceTTC,
        productInventory: product.productInventory,
        categoryId: product.category.id,
        present: true
    };

    const categoryName = product.category.name;

    useEffect(() => {
        apiBackEnd.get('no-role/all-category-dto')
            .then(response => {
                setCategoryList(response.data?.content)
            })
    }, []);


    const category = {
        id: product.category.id,
        name: product.category.name,
        url: product.category.url,
    }



    console.log(category);
   

    const handleSubmit = (values) => {
        console.log(initialValues)
        console.log(values)
        // values['category'] = category;
        updateProduct(product.idProduct,
            {
            ...values,
            'id':values.idProduct,
            'name': values.name,
            'productDescription': values.productDescription,
            'priceTTC': values.priceTTC,
            'productInventory': values.productInventory,
            'categoryId': values.categoryId,
            'present': true,
            'category': {
                'id': values.categoryId,
                'name': values.categoryName,
                'url': values.categoryUrl
        }})
            .then((response) => {
                if (response.status == 200) {
                    alert("votre produit a bien ete modifie")
                    setIsupdate(false)
                    navigate("/products-list")

                }
            }
            )

    };





    return (

        <div className='flex justify-center items-center min-h-full p-10'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >

                <Form className='font-manuale flex flex-col gap-5 border border-zinc-300 p-10 w-4/5 lg:w-1/3 text-dark'>
                    <h2 className='text-2xl text-center'>Mise à jour Produit</h2>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='name' className='text-sm font-normal'>Nom</label>
                        <Field name='name' type='text' className='border border-zinc-400' />
                        <ErrorMessage name='name'>
                            {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                        </ErrorMessage>
                    </div>


                    <div className='flex flex-col gap-2'>
                        <label htmlFor='productDescription' className='text-sm font-normal'>Description</label>
                        <Field name='productDescription' type='text' className='border border-zinc-400' />
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
                            {/* <option value={0} selected disabled hidden>Veuillez sélectionner une catégorie</option> */}
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

                    <div className="flex w-full items-center text-dark">

                    </div>

                    <Button className='bg-dark border-0 text-white hover:bg-dark-light hover:text-white py-3 font-manuale text-sm font-normal mt-3'>Modifier</Button>

                </Form>
            </Formik>
        </div>

    );
};

export default ProductUpdateView;