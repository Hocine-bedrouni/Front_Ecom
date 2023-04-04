import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ProductUpdate from './ProductUpdateView';
// import { productStore } from "../../redux-store/productSlice"
import { useDispatch } from 'react-redux';
import apiBackEnd from '../../api/backend/api.Backend';
import { Button } from 'react-bootstrap';
import ProductUpdateView from './ProductUpdateView';
import { deleteProduct } from '../../api/backend/account';
import PopUpDelete from '../../components/PopUpDelete';




const ProductView = () => {



  const [isUpdate, setIsupdate] = useState(false)
  const [productList, setProductlist] = useState([])
  const [produit, setProduit] = useState({})
  const navigate = useNavigate();


  const [page, setPage] = useState(0);
  const[nbPage, setNbPage]= useState(0);

  const [size, setSize] = useState(5);

  const [showModal, setShowModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState({});


  const handleChange = (e) => {
    // 👇 Get input value from "event"
    setSize({
      [e.target.name]: e.target.value
    });
  };
 

  useEffect(() => {
    fetchList(0)
    setPage(0)
  }, [showModal]);

  const fetchList = (page) => {
    apiBackEnd
        .get("no-role/all-product-dto?page=" + `${ page }` + "&size=" + size)
        .then(response => {
          setProductlist(response.data.content),
          setNbPage(response.data.totalPages)})
        
}

const next = (page)=>{
  if(page < nbPage){
  setPage(page) 
  fetchList(page)}
}

const before = (page) => {
  setPage(page)
  if (page < 0){
    setPage(0)
  }else {
  fetchList(page)
}}

  const handleUpdate = (produit) => {
    setIsupdate(true)
    setProduit(produit)
  }

  const handleView= (produit)=> {
    navigate("/product-detail/"+`${produit.idProduct}`)
  }



  const handleAddPicture= (produit)=> {
    navigate("/add-picture/"+`${produit.idProduct}`)
  }

  const handleDeleteProduct = (produit) => {
    setProductToDelete(produit);
    setShowModal(true)
  }


  if (!isUpdate) {
    return (
    
     <div>
       { showModal &&
          <PopUpDelete  setShowModal={setShowModal} id={productToDelete.idProduct} deleteObject={deleteProduct}
            message = "Vous etes sur le point de supprimer un produit"
          /> }
        <input
          value={size}
          type="number"
          id="message"
          name="message"
          onChange={handleChange}
        />
          <h2 className='my-10'> Liste des Produit</h2>

          <table className="table-fixed border  border-slate-400 mx-auto">
            <thead className='bg-orange-100'>
              <tr className='border  border-slate-300 '>
                <th className='w-8 py-2  '> id</th>
                <th className='w-40 py-2'>Nom</th>
                <th className='w-48'>description</th>
                <th className='w-20  text-justify'>stock</th>
                <th className='w-32'>Image</th>
                <th className='w-1/3'>Actions</th>

              </tr>
            </thead>
            <tbody className='' >

              {
                productList.map(product => (
                  <tr key={product.idProduct} className="border border-slate-300 justify center">
                    <td className='py-2 pl-3'>{product.idProduct}</td>
                    <td>{product.name}</td>
                    <td>{product.productDescription}</td>
                    <td className='mx-auto'>{product.productInventory}</td>
                    <td><button type="button" className="btn w-24 bg-dark text-orange-400 hover:bg-green-600 hover:text-white" onClick={() => handleAddPicture(product)} >Ajout Image</button></td>
                    <td className='flex justify-center max-sm:flex-col gap-5 py-2'>
                      <button type="button" className="btn w-24 bg-dark text-orange-400 hover:bg-green-600 hover:text-white" onClick={() => handleUpdate(product)} >Editer</button>
                      <button type="button" className="btn w-24 bg-dark text-orange-400 hover:bg-blue-600 hover:text-white" onClick={() => handleView(product)}>Details</button>
                      <button type="button" className="btn w-24 bg-dark text-orange-400 hover:bg-red-600 hover:text-white" onClick={() => handleDeleteProduct(product)} >Supprimer</button>
                    </td>
                  </tr>
                ))
              }


            </tbody>
          </table>

         
          

          <Button
            className=" bg-dark text-orange-400 w-24 ml-12 bg-transparent my-5"
            onClick={() => navigate("/product/add")}
          >
            Ajouter
          </Button>
         
          <br />
          <div className='  flex justify-center space-x-2 mx-auto py-5'>
          {/* <div className='   mx-auto py-5'> */}
            {/* <button type="button" className="btn bg-transparent btn-info"  onClick={() => next(page+1)} >Next</button> */}
            {page == 0 ? (
              <Button type="button" className=" bg-dark text-orange-400 px-4  " disabled onClick={() => before(page - 1)}>Prev</Button>
            ) : (
              <Button type="button" className=" bg-dark text-orange-400 px-4  " onClick={() => before(page - 1)}>Prev</Button>
            )}

            <Button type="button" className="  bg-dark text-orange-400 px-2 " disabled onClick={() => fetchList(0)} >{page + 1}</Button>
            {/* <button type="button" className="btn bg-transparent btn-info"  onClick={() => next(page+1)} >Next</button> */}
            {page < nbPage - 1 ? (
              <Button type="button" className=" bg-dark text-orange-400 px-4 " onClick={() => next(page + 1)} >Next</Button>
            ) : (
              <Button type="button" className=" bg-dark text-orange-400 px-4  " disabled onClick={() => next(page + 1)} >Next</Button>
            )}
          </div>
       
        </div>

     
    );
  } else {
    return <ProductUpdateView product={produit} setIsupdate={setIsupdate} />
  }


};

export default ProductView;