import React from 'react';
import { useEffect, useState } from 'react';

import axios from 'axios';

import { useDispatch } from "react-redux";
import Cards2 from './Cards2';


const Produits = () => {

  const dispatch = useDispatch();

  const [page, setPage] = useState(0)
  const [nbPage, setNbPage] = useState(0)
  const [size, setSize] = useState(3)

  const [productList, setProductList] = useState([]);



  useEffect(() => {
    fetchList(page)
  }, []);

  const fetchList = (page) => {
    axios
      .get("http://localhost:9000/api/shopping-online/no-role/all-product-dto?page=" + `${page}` + "&size=" + size)
      .then(response => {
        setProductList(response.data.content),
          setNbPage(response.data.totalPages)
      })
  }

  const next = (page) => {
    if (page < nbPage) {
      setPage(page)
      fetchList(page)
    }
  }

  const before = (page) => {
    setPage(page)
    if (page < 0) {
      setPage(0)
    } else {
      fetchList(page)
    }
  }

  return (
    <div className='  '>
      <div className=' grid grid-cols-3 gap-4 w-full justify-evenly'>
        {
          productList
            .map((produit, index) => (
              <Cards2 key={index} product={produit} />)
            )}
      </div>

      <div className='btn w-full '>
        {/* <button type="button" className="btn bg-transparent btn-info"  onClick={() => next(page+1)} >Next</button> */}
        {page == 0 ? (
          <button type="button" className="btn bg-transparent btn-info" disabled onClick={() => before(page - 1)}>Prev</button>
        ) : (
          <button type="button" className="btn bg-transparent btn-info" onClick={() => before(page - 1)}>Prev</button>
        )}

        <button type="button" className="btn bg-transparent btn-info" onClick={() => fetchList(0)} >{page + 1}</button>
        {/* <button type="button" className="btn bg-transparent btn-info"  onClick={() => next(page+1)} >Next</button> */}
        {page < nbPage - 1 ? (
          <button type="button" className="btn bg-transparent btn-info" onClick={() => next(page + 1)} >Next</button>
        ) : (
          <button type="button" className="btn bg-transparent btn-info" disabled onClick={() => next(page + 1)} >Next</button>
        )}

      </div>
    </div>
  );
};

export default Produits;