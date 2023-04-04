import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authenticate } from '../../api/backend/account';
import { selectIsLogged, signIn } from '../../redux-store/authenticationSlice';
import { URL_FORGOT_PASSWORD } from '../../constants/urls/urlFrontEnd';
import Button from '../Button';
import CartSecondStepLoginForm from './CartSecondStepLoginForm';
import CartSecondStepRegisterForm from './CartSecondStepRegisterForm';
import CartTotalPriceSummary from './CartTotalPriceSummary';
import CartProductListSummary from './CartProductListSummary';

const CartSecondStep = ({ setStep }) => {
  const isLogged = useSelector((state) => selectIsLogged(state));
  const dispatch = useDispatch();
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    if (isLogged) {
      setStep(prevStep => prevStep + 1)
    }
  }, [isLogged])

  return (
      <div className="flex flex-col md:flex-row md:justify-around md:items-start container mx-auto">
        <div className="flex flex-col md:w-1/3">
          {
            showRegisterForm ?
              <CartSecondStepRegisterForm
                setShowRegisterForm={setShowRegisterForm}
              />
              :
              <React.Fragment>
                <div className="font-manuale flex flex-col gap-5 border border-zinc-300 p-10 mb-10 text-dark">
                  <h2 className="text-2xl text-center">Nouveau client?</h2>
                  <Button
                    className="bg-dark border-0 text-white hover:bg-dark-light hover:text-white py-3 font-manuale text-sm font-normal mt-3"
                    onClick={() => { setShowRegisterForm(true) }}
                  >
                    Créer un compte
                  </Button>
                </div>

                <CartSecondStepLoginForm />
              </React.Fragment>
          }
        </div>
        <div className='flex flex-col md:w-1/4 p-10 gap-5 bg-zinc-100 font-manuale'>
          <CartProductListSummary/>
          <hr/>
          <CartTotalPriceSummary/>
        </div>
      </div>
  );
};

export default CartSecondStep;