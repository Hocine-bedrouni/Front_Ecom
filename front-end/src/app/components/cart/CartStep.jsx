import React from 'react';
import CartFirstStep from './CartFirstStep';
import { CartFourthStep } from './CartFourthStep';
import CartSecondStep from './CartSecondStep';
import CartThirdStep from './cart-third-step/CartThirdStep';

const CartStep = ({step, setStep}) => {
  switch(step){
    case 1:
      return (<CartSecondStep setStep={setStep}/>);
    case 2:
      return (<CartThirdStep setStep={setStep} />);
    case 3:
      return (<CartFourthStep/>);
    default: 
      return (<CartFirstStep setStep={setStep}/>);
  }
};

export default CartStep;