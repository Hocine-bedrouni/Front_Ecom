import React, { useState } from 'react';
import { useEffect } from 'react';
import CartNavStep from '../components/cart/CartNavStep';
import CartStep from '../components/cart/CartStep';

const CartView = () => {
    const [ step, setStep ] = useState(0);

    useEffect(() => {
        if(step < 0 || step > 3)
        setStep(0);
    }, [])
    
    return (
        <div className='flex flex-col items-center w-full h-full'>
            <hr className='mt-24 border-dark w-full border-2 border-t-0'/>
            <div className='flex flex-col items-center my-10 h-full gap-24 w-full'>
                <div>
                    <CartNavStep step={step} setStep={setStep}/>
                </div>
                <div className='w-full'>
                    <CartStep step={step} setStep={setStep}/>
                </div>
            </div>
        </div>
    );
};

export default CartView;