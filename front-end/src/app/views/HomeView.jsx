import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import CategoryCard from '../components/CategoryCard';
import LargeNewsCard from '../components/LargeNewsCard';
import LargePromotionCard from '../components/LargePromotionCard';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';
import ErgonomyIcon from '../components/svg/ErgonomyIcon';
import apiBackEnd from '../api/backend/api.Backend';
import axios from 'axios';

const HomeView = () => {
    const [categories, setCategories] = useState();
    const [productList, setProductList] = useState([{id: -1}]);

    useEffect(() => {
        apiBackEnd.get('no-role/all-category-dto')
            .then(response => setCategories(response.data?.content))
            
        apiBackEnd.get('no-role/all-product-dto?page=0&size=4')
            .then(response => setProductList(response.data?.content))
    }, []);
    
    return (
        <div className='flex flex-col'>
            <Slider>
                {productList?.map(item => 
                    <div key={item.id} className='relative'>
                        <div className='absolute min-h-full flex flex-col justify-center items-start ml-8 w-1/2 gap-10 '>
                            <h2 className=' max-xs:pt-16 font-rubik text-white '>{item.name}</h2>
                            <p className='text-zinc-400 text-left'>{item.productDescription}</p>
                            <h5 className='text-zinc-400 text-left'>Prix: {new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(item.priceTTC)}</h5>
                            <Button className='text-xs'>DÉCOUVREZ</Button>
                        </div>
                        <img src="./img/hero_header_2_en_1.png" alt="image" className='object-contain'/>
                    </div>
                )}
            </Slider>
            <div className='flex flex-col m-10'>
                <div className='flex flex-col gap-5 text-center font-rubik'>
                    <h4 className='text-primary text-lg'>Un écosystème connecté</h4>
                    <h2>DES PRODUITS CONÇUS POUR VOUS FACILITER LA VIE</h2>
                </div>
                <div className='columns-2 lg:columns-4 space-y-6 my-6'>
                    {categories?.map(category => 
                        <CategoryCard key={category.id} category={category}/>
                    )}
                </div>
                <div className='flex gap-14 justify-center font-rubik'>
                    <div className='flex gap-5 items-center'>
                        <ErgonomyIcon />
                        <span>Ergonomique</span>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <ErgonomyIcon />
                        <span>Mis&nbsp;à&nbsp;jour</span>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <ErgonomyIcon />
                        <span>Sécurisé</span>
                    </div>
                </div>
            </div>
            <div className='bg-dark py-10 px-auto flex gap-5 px-16 justify-between'>
                <LargeNewsCard />
                <LargePromotionCard />
            </div>
            <div>
                <div className='columns-2 lg:columns-4 space-y-6 my-6'>
                    {productList.map(product => 
                        <ProductCard key={product.id} product={product}/>
                    )}
                </div>
                <div className='bg-beige px-10 py-5 flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-24 text-left max-sm:hidden'>
                    <img src="./img/video ecom.gif" alt="" />
                    <span className='w-1/2 lg:w-1/4 text-2xl font-rubik'>Nous avons fait le choix du haut de gamme pour satisfaire au mieux le passionné de high tech qui en vous.</span>
                </div>
                <div className='bg-gray-300 py-10 flex flex-col justify-center items-center'>
                    <h1>"</h1>
                    <h3 className='w-1/4 text-2xl py-5 font-rubik'>"J'équipe toute ma maison avec les produits Ecom et je n'ai jamais été déçu"</h3>
                    <h6>Voir tous les avis</h6>
                </div>
                <div className='h-40 flex justify-center gap-20 font-rubik'>
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
                    <div className='flex items-center'>
                        <ErgonomyIcon />
                        <span>
                            Retour&nbsp;gratuits&nbsp;60&nbsp;jours
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeView;
