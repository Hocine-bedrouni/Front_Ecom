import React from 'react';
import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cards2 from '../components/Cards2';
import apiBackEnd from '../api/backend/api.Backend';
import ProductCard from '../components/ProductCard';

const CategoryDetails = () => {

    const [page, setPage] = useState(0)
    const [nbPage, setNbPage] = useState(0)
    const [size, setSize] = useState(1)

    const [listProduct, setListProduct] = useState([]);


    const params = useParams();

    useEffect(() => {
        fetchList(page)
    }, []);

    const fetchList = (page) => {
        apiBackEnd
            .get("no-role/get-by-category-id/"+`${params.categoryId}`+"?page="+ `${page}` + "&size=" + 2 )
            .then(response =>{
                setListProduct(response.data.content)
                setNbPage(response.data.totalPages)
    })
    }

    // const next = (page) => {
    //     if (page < nbPage) {
    //       setPage(page)
    //       fetchList(page)
    //     }
    //   }
    
    //   const before = (page) => {
    //     setPage(page)
    //     if (page < 0) {
    //       setPage(0)
    //     } else {
    //       fetchList(page)
    //     }
    //   }

    return (
        <div>
            <h1 className='text-4xl py-5'>Produit par categorie: {params.categoryId}  </h1>

            <div className='  '>
      <div className=' grid grid-cols-3 gap-10 w-full justify-evenly mb-10'>
        {
          listProduct
            .map((produit, index) => (
              <ProductCard key={index} product={produit} />)
            )}
      </div>

      {/*<div className='btn w-full'>
        {/* <button type="button" className="btn bg-transparent btn-info"  onClick={() => next(page+1)} >Next</button> 
        {page == 0 ? (
          <button type="button" className="btn bg-transparent btn-info" disabled onClick={() => before(page - 1)}>Prev</button>
        ) : (
          <button type="button" className="btn bg-transparent btn-info" onClick={() => before(page - 1)}>Prev</button>
        )}

        {/* <button type="button" className="btn bg-transparent btn-info" onClick={() => fetchList(0)} >{page + 1}</button> */}
        {/* <button type="button" className="btn bg-transparent btn-info"  onClick={() => next(page+1)} >Next</button> */}
        {/* {page < nbPage - 1 ? ( 
          <button type="button" className="btn bg-transparent btn-info" onClick={() => next(page + 1)} >Next</button>
        ) : (
          <button type="button" className="btn bg-transparent btn-info" disabled onClick={() => next(page + 1)} >Next</button>
        )}
      </div>
        </div>*/}

</div>
        </div>
    );
};

export default CategoryDetails;