import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { URL_HOME, URL_ADMIN_HOME, URL_REGISTER, URL_FORGOT_PASSWORD } from '../constants/urls/urlFrontEnd';
import { selectIsLogged, signIn } from '../redux-store/authenticationSlice';
import Button from '../components/Button';
import { authenticate } from '../api/backend/account';
import {  } from '../constants/urls/urlFrontEnd';

/**
 * Component Login
 *
 * @author Ibrahim BUYOYA
 */
const LoginView = () => {
  const [errorLog, setErrorLog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector(selectIsLogged);

  useEffect(() => {
    if (isLogged) navigate(URL_HOME);
  }, [isLogged]);
  
  const initialValues = {
    email: '',
    password: ''
  }
  
  const handleSubmit = (values) => {
    authenticate(values)
      .then((res) => {
        if (res.status === 200 && res.data.token) {
          dispatch(signIn(res.data.token));
          navigate(URL_ADMIN_HOME);
        }
      })
      .catch(() => setErrorLog(true));
  };

  return (
    <div className="flex justify-center items-center min-h-full p-10">
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className="font-manuale flex flex-col gap-5 border border-zinc-300 p-10 w-4/5 lg:w-1/3 text-dark">
          <h2 className="text-2xl text-center">Se connecter</h2>
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
            <Link  to={URL_FORGOT_PASSWORD} className=''>Forgot Password
          </Link>
          </div>
         
          <Button className="bg-dark border-0 text-white hover:bg-dark-light hover:text-white py-3 font-manuale text-sm font-normal mt-3">
            Se connecter
          </Button>
          <div className="flex w-full items-center text-dark">
            <hr className="w-full border-zinc-400" />
            <span className="mx-5 font-manuale text-sm">ou</span>
            <hr className="w-full border-zinc-400" />
          </div>
          <Link to={URL_REGISTER} className="bg-white border transition-all text-center border-dark text-dark hover:bg-dark-light hover:text-white py-3 font-manuale text-sm font-normal">
            S'enregistrer
          </Link>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginView;
