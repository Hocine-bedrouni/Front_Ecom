import React from 'react';

// import { productStore } from "../redux-store/productSlice"
import { useDispatch } from "react-redux";
import { fetchProduitListe } from '../api/backend/account';
import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Cards from './Cards2';
import axios from "axios";

const Slider = ({children, className, interval = 10000}) => {

    // const dispatch = useDispatch();

    const [productList, setProductList] = useState([]);
    const [nbPage, setNbPage] = useState(0);

    
    // dispatch(productStore(productList));


    const baseUrl = "http://react-responsive-carousel.js.org/assets/";

    return (

        <Carousel autoPlay
            interval={interval}
            infiniteLoop
            thumbWidth={120}
            showIndicators={true}
            showStatus={false}
            showThumbs={false}
            className={className}>
                {children}
        </Carousel>
    );
};

export default Slider;