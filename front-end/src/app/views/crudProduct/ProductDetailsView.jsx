import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
// import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ErgonomyIcon from '../../components/svg/ErgonomyIcon';
import { fetchProduitListe, getByIdProduct } from '../../api/backend/account';
import apiBackEnd from '../../api/backend/api.Backend';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import { addToCart } from '../../redux-store/cartSlice';




const ProductDetailsView = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }


  const params = useParams();
  const [product, setProduct] = useState([]);
  const [productList, setProductList] = useState([]);
  const [category, setCategory] = useState('');
  const [load, setLoad] = useState(false);
  

  useEffect(() => {
    if(params.id) {
      fetchProductById(params.id)
      apiBackEnd.get('no-role/all-product-dto?page=1&size=3')
      .then(response => setProductList(response.data?.content))
    }
  }, [params]);

  const fetchProductById = (id) => {
    getByIdProduct(id)
      .then(response => {
        setProduct(response.data),
        setCategory(response.data.category)
        setLoad(true)
      })
  }

  return (

    <div >
     { load ?
      <div className='flex'>
  
        <div className="relative  bg-cover bg-no-repeat bg-[url('../img/hero_header.png')] w-2/3 h-92" >
          <p className='text-white py-12 pl-10'> Accueil/{category.name}/{product.name} </p>
          <img src={product.pictures[0]?.url} alt="image" className='absolute child w-96 h-96 bottom-3 right-3' />
          <img src="../img/ceintre_connecte.png" alt="image" className='absolute child w-28 h-28 top-20 left-10 rounded-full border border-orange-400' />
          <img src="../img/ceintre_connecte.png" alt="image" className='absolute child w-28 h-28 bottom-24 left-10 rounded-full border border-orange-400' />

        </div>
      
        <div className='bg-neutral-800 w-1/3 pt-10 text-white  pl-1' >
          <p className='text-3xl font-bold py-2'>{product.name}</p>
          <p className='text-1xl pr-10'>{product.productDescription} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, odit.</p>
          <p className='text-2xl py-10'>Prix : {product.priceTTC} €</p>
          <Button className="" onClick={() => {handleAddToCart(product)}}>Ajouter au Panier</Button>
          <p className='py-10 text-2xl font-bold text-orange-400'>*********</p>
        </div>
     
      </div>
   : <div>Chargment en cours</div>
} 
      <div className=' bg-orange-100  text-black lg:h-80 sm:h-auto pt-10 '>
        <div className=' flex justify justify-center gap-20 mx-auto'>
          <p>
            Description
          </p>
          <p>
            Informations détaillées
          </p>
          <p>
            Avis
          </p>
        </div>

        <div className='w-2/3 flex mx-auto pt-10 pb-20'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nihil molestiae aperiam ipsum nostrum tempora ab facilis incidunt rem sed earum repellat fugit recusandae et mollitia, beatae pariatur vel. Totam omnis libero eius vel facere earum at eos cum architecto natus quibusdam deleniti alias aliquid dolor labore laborum praesentium porro fugit ab voluptas, maiores, ipsam eligendi! Necessitatibus et, expedita voluptatibus non, molestiae suscipit doloribus excepturi quae adipisci voluptatum quaerat deleniti, similique dignissimos dolore minima. Animi temporibus facere quis optio, culpa natus nostrum sapiente dolorum perferendis voluptas autem inventore aspernatur ab, quae amet assumenda ex earum ut consequatur alias neque atque.
        </div>
      </div>
      <p className=' text-4xl font-bold py-10'>Produits Similaires</p>
      <div className='columns-2 lg:columns-3 max-sm:columns-1 space-y-6 my-6  '>
        {productList?.map(product =>
          // <ProductCard key={product.id} product={product}/>
          // <div className='h-auto'>
          <Link
            to={"/product-detail/" +`${product.idProduct}`} 
            className={` bg-[url('../img/fond_carte_catégories.png')] bg-cover {/*text-white text-center*/} w-64 flex h-100 flex-col mx-auto `}
          >
            {/* <h3 className="py-2 group-hover:translate-y-3 transition-all">
              {product.name}
            </h3> */}
            <img
              src="../img/huawei-sound-x-frandroid-2020 1.png"
              alt=""
              className="object-contain h-60 py-auto"
            />
             <div className='bg-white text-black pt-5 pl-4 font-bold'>{product.name}</div>
             <div className='bg-white text-black h-10 pl-4'> Prix : {product.priceTTC} €</div>
          {/*<div className="group-hover: text-black w-full block py-2 transition-all">
            Ajouter au Panier
           
          </div> */}
          </Link>
           
        )}
      </div>

      
      <div className='h-40 flex justify-center lg:gap-20  flex-center font-rubik max-sm:hidden '>
        <div className='flex items-center '>
          <ErgonomyIcon />
          <span>
            Garantie&nbsp;5&nbsp;ans
          </span>
        </div>
        <div className='flex items-center'>
          <ErgonomyIcon />
          <span>
            Paiement&nbsp;3x&nbsp;sans&nbsp;frais
          </span>
        </div>
        <div className='flex items-center '>
          <ErgonomyIcon />
          <span>
            Retour&nbsp;gratuits&nbsp;60&nbsp;jours
          </span>
        </div>
      </div>
    </div>

  );
};

export default ProductDetailsView;