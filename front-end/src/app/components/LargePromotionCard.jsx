import React from 'react';
import { Link } from 'react-router-dom';
import StickerPromoIcon from './svg/StickerPromoIcon';

const LargePromotionCard = () => {
  return (
    <Link to='/promo' className={`block bg-cover group overflow-hidden w-1/2`} style={{backgroundImage: 'url(\'./img/Carte large promotions variant.png\')'}}>
      <div className='relative'>
        <img src="./img/image tensiomètre tourné.png" alt="" className='absolute right-0 w-2/3 group-hover:translate-x-5 transition-all object-fill'/>
        <div className='p-5 py-12 flex flex-col justify-between items-start gap-12'>
          <StickerPromoIcon className='group-hover:translate-x-5 transition-all'/>
          <span className='text-dark border-0 bg-zinc-50 group-hover:bg-dark group-hover:text-white transition-all bg-opacity-50 font-semibold px-10 py-3'>DÉCOUVRIR LES PROMOTIONS</span>
        </div>
      </div>
    </Link>
  );
};

export default LargePromotionCard;