import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/outline';

const CartNavStep = ({ step, setStep }) => {
  return (
    <div className='flex justify-center items-center font-rubik'>
      <div className='flex flex-col items-center gap-3 relative'>
        <button 
          className={`rounded-full p-5 border flex items-center border-dark text-dark`}
          onClick={() => setStep(0)}>
            <ShoppingCartIcon className='w-6'/>
        </button>
        <span className='absolute -bottom-8'>1.&nbsp;MON&nbsp;PANIER</span>
      </div>
      <hr className={`w-32 mx-1 ${step >= 1 && 'border-dark'}`}/>
      <div className='flex flex-col items-center gap-3 relative'>
        <button 
          className={`rounded-full p-5 border flex items-center ${step >= 1 ? 'border-dark text-dark' : 'text-zinc-300 border-zinc-300'}`}
          onClick={() => setStep(1)}>
            <ShoppingCartIcon className='w-6'/>
        </button>
        <span className='absolute -bottom-8'>2.&nbsp;IDENTIFICATION</span>
      </div>
      <hr className={`w-32 mx-1 ${step >= 2 && 'border-dark'}`}/>
      <div className='flex flex-col items-center gap-3 relative'>
        <button 
          className={`rounded-full p-5 border flex items-center ${step >= 2 ? 'border-dark text-dark' : 'text-zinc-300 border-zinc-300'}`}
          onClick={() => setStep(2)}>
            <ShoppingCartIcon className='w-6'/>
        </button>
        <span className='absolute -bottom-8'>3.&nbsp;LIVRAISON</span>
      </div>
      <hr className={`w-32 mx-1 ${step >= 3 && 'border-dark'}`}/>
      <div className='flex flex-col items-center gap-3 relative'>
        <button 
        className={`rounded-full p-5 border flex items-center ${step >= 3 ? 'border-dark text-dark' : 'text-zinc-300 border-zinc-300'}`}
        onClick={() => setStep(3)}>
          <ShoppingCartIcon className='w-6'/>
        </button>
        <span className='absolute -bottom-8'>4.&nbsp;PAIEMENT&nbsp;SÉCURISÉ</span>
      </div>
    </div>
  );
};

export default CartNavStep;