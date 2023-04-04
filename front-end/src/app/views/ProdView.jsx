import React, { useState } from 'react';
import { useGetAllProductsQuery, useGetProductQuery } from '../redux-store/productSlice';
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { store } from "../redux-store/store";
import { productSlice } from '../redux-store/productSlice';
import { Link } from 'react-router-dom';

const ProdView = () => {



    const {
        data: allProductsData,
        error,
        isError,
        isLoading,
    } = useGetAllProductsQuery();

    const { data: singleProductData } = useGetProductQuery("4");

    return (
        <Provider store={store}>
            <ApiProvider api={productSlice}>
                <div>
                    <div className='bg-orange-50 h-full'>
                        <p className='py-4 pl-10'>Accueil/produits</p>
                        <div className='flex gap-5 text-center pb-12'>
                            <p className='w-48 text-2xl font-bold'>Produits </p>
                            <p className='px-20 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa debitis libero officia explicabo, eveniet aut vero!</p>
                        </div>
                    </div>
                    <div>
                        <p className='pl-10  text-2xl pt-10'>Trier - Filtre</p>
                    </div>
                    <div className='grid grid-cols-4 gap-4'>
                        {allProductsData?.content.map(product =>
                            <Link
                                to={"/product/" + `${product.idProduct}`}
                                className={`group className bg-[url('./img/fond_carte_catégories.png')] bg-cover text-white text-center w-64 flex  flex-col mx-auto my-12`}
                            >
                                <h3 className="py-2 group-hover:translate-y-3 transition-all">
                                    {product.name}
                                </h3>
                                <img
                                    src="./img/Pexels Photo by Vishven Solanki.png"
                                    alt=""
                                    className="object-contain h-64"
                                />
                                <div className=' h-10'>{product.productDescription}</div>
                                <span className="group-hover: text-orange-500 bg-w w-full block py-2 transition-all">
                                    Prix :  {product.priceTTC} €
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </ApiProvider>
        </Provider>
    );
};

export default ProdView;