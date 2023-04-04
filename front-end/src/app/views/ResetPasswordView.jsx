import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { resetPass } from "../api/backend/account";
import Button from '../components/Button';
import { URL_LOGIN } from '../constants/urls/urlFrontEnd';

const ResetPasswordView = () => {
    const navigate = useNavigate();
    const params = useParams();
    const initialValues = {
        token:params.token,
        newPassword: "",
        confirmPassword: ""
    };

    const validationSchema = Yup.object().shape({
       
        newPassword: Yup.string()
            .required("Mot de passe est obligatoire")
            .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,128}$/, `Le mot de passe doit contenir au minimum:\n- 8 caractères\n- 1 majuscule\n- 1 minuscule\n- 1 chiffre\n- 1 caractère spécial\n- Pas d'espace !`)
            .min(4, "Mot de passe doit être plus grand que 4 caractères")
            .max(10, "Mot de passe doit être plus petit que 10 caractères"),
        confirmPassword: Yup.string()
            .required("Confirmation de mot de passe est obligatoire")
            .oneOf(
                [Yup.ref("newPassword"), null],
                "Le mot de passe de confirmation ne correspond pas"
            )
        
    });



    const handleSubmit = (values) => {
        const body = {
            token: values.token,
            password: values.newPassword
        }
        if(values.newPassword){
      resetPass(body)
        .then((res) => {
   
          if (res.status === 200 ) {
            alert(res.data)
            navigate({URL_LOGIN});
          }
        })}

    };

    return (

        <div className='flex justify-center items-center min-h-full p-10'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ resetForm }) => (
                <Form className='font-manuale flex flex-col gap-5 border border-zinc-300 p-10 w-4/5 lg:w-1/3 text-dark'>
                    <h2 className='text-2xl text-center'>Reset Password</h2>
               
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='newPassword' className='text-sm font-normal'>Mot de passe *</label>
                        <Field name='newPassword' type='password' className='border border-zinc-400'/>
                        <ErrorMessage name='newPassword'>
                            {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                        </ErrorMessage>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='confirmPassword' className='text-sm font-normal'>Confirmation du mot de passe *</label>
                        <Field name='confirmPassword' type='password' className='border border-zinc-400'/>
                        <ErrorMessage name='confirmPassword'>
                            {msg => <span className='text-red-500 text-sm'>{msg}</span>}
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
                </Form>
            )}
            </Formik>
        </div>

     
    );
};    

export default ResetPasswordView;