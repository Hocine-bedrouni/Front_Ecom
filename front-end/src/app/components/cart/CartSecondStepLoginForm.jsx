import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { authenticate } from '../../api/backend/account';
import { signIn } from '../../redux-store/authenticationSlice';
import { URL_FORGOT_PASSWORD } from '../../constants/urls/urlFrontEnd';
import Button from '../Button';

const CartSecondStepLoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: ''
  }

  const handleSubmit = (values) => {
    authenticate(values)
      .then((res) => {
        if (res.data.token) {
          dispatch(signIn(res.data.token));
        }
      })
      .catch((err) => {
        toast.error("Identifiants incorrectes")
      })
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Form className="font-manuale flex flex-col gap-5 border border-zinc-300 p-10 text-dark">
        <h2 className="text-2xl text-center">Déjà client?</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-normal">
            Adresse e-mail *
          </label>
          <Field
            name="email"
            type="text"
            className="border border-zinc-400"
          />
          <ErrorMessage name="email">
            {(msg) => <span className="text-red-500 text-sm">{msg}</span>}
          </ErrorMessage>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-normal">
            Mot de passe *
          </label>
          <Field
            name="password"
            type="password"
            className="border border-zinc-400"
          />
          <ErrorMessage name="password">
            {(msg) => <span className="text-red-500 text-sm">{msg}</span>}
          </ErrorMessage>
        </div>
        <div>
          <Link to={URL_FORGOT_PASSWORD} className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
            Mot de passe oublié?
          </Link>
        </div>

        <Button className="bg-dark border-0 text-white hover:bg-dark-light hover:text-white py-3 font-manuale text-sm font-normal mt-3">
          Se connecter
        </Button>
      </Form>
    </Formik>
  );
};

export default CartSecondStepLoginForm;