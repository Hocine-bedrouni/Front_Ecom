import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { forgetpass } from "../api/backend/account";
import { useNavigate , Link} from "react-router-dom";

import Button from '../components/Button';
import { URL_RESET_PASSWORD } from '../constants/urls/urlFrontEnd';

const validationSchema = Yup.object().shape({
  
    email: Yup.string()
        .email("email invalide")
        .required("l'email est obligatoire"),
});
const initialValues = {
    email: ""
};

const ForgotPasswordView = () => {

    const navigate = useNavigate();

    
    
    const handleSubmit = (values) => {
        if(values.email){
        forgetpass(values)
        .then((res) => {
          if (res.status === 202 ) {
            alert(res.data)
            navigate("/");
          }
        })
    }
    };
    



    return (

        <div className="flex justify-center items-center min-h-full p-10">
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ resetForm }) => (
          <Form className="font-manuale flex flex-col gap-5 border border-zinc-300 p-10 w-4/5 lg:w-1/3 text-dark">
            <h2 className="text-2xl text-center">Forget Password</h2>
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
            <Button className="bg-dark border-0 text-white hover:bg-blue-500 hover:text-white py-3 font-manuale text-sm font-normal mt-3">
              Valider
            </Button>
            <div className="flex w-full items-center text-dark">
              <hr className="w-full border-zinc-400" />
              <span className="mx-5 font-manuale text-sm">ou</span>
              <hr className="w-full border-zinc-400" />
              
            </div>
            <button onClick={resetForm} className="bg-dark border-0  text-white hover:bg-red-500 hover:text-white py-3 font-manuale text-sm font-normal mt-3">
              Annuler
            </button>

            <Link className='text-red-500 text-sm'  to={URL_RESET_PASSWORD}>
        </Link>
          </Form>
        )}
        </Formik>

      
      </div>
            
    );
};

export default ForgotPasswordView;