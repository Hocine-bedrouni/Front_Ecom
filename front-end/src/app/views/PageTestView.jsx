import React from 'react';
import Nav2 from '../components/layouts/Nav2';
import Produits from '../components/Produits';

import { useState, useEffect } from 'react';
import axios from "axios";



const PageTestView = () => {

    // const [catList, setCatList] = useState([])

    useEffect(() => {
        fetchCat()
    }, []);



    
    
    const fetchCat = () => {
        axios
            .get("http://localhost:9000/api/shopping-online/public/all-category-dto")
            .then((response) => {
                if (response.status === 200) {
                  } else {
                  }
                }
            )
    }


    return (
        <div>
            <h1>Page de TEST</h1>
            {/* <Nav2 /> */}
            {/* <Produits /> */}
          
        </div>
    );
};

export default PageTestView;