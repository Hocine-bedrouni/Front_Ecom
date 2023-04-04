import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { updatePass } from "../api/backend/account";
import Button from '../components/Button';
import { toast } from 'react-toastify';




const UpdatePasswordView = () => {
    const navigate = useNavigate();
    const initialValues = {
        oldPassword:"",
        newPassword: "",
        confirmPassword: ""
    };
    
    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .required("L'ancien mot de passe est obligatoire"),

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
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        }
        if(values.newPassword){
        updatePass(body)
        .then((res) => {
            toast.success("Votre mot de passe a été modifié avec succès")
            navigate(-1)
        }).catch((err) => {
            // retour 400 signifie que l'ancien mot de passe est incorrecte
            if(err.response.status === 400) {
                toast.error("L'ancien mot de passe saisi est incorrecte")  
            } else {
                toast.error("Erreur lors de la modification du mot de passe")
            }
        })}
    
    };

    return (
        <div className='flex justify-center items-center min-h-full p-10'>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className='font-manuale flex flex-col gap-5 border border-zinc-300 p-10 w-4/5 lg:w-1/3 text-dark'>
                <h2 className='text-2xl text-center'>Update Password</h2>
        
                <div className='flex flex-col gap-2'>
                    <label htmlFor='oldPassword' className='text-sm font-normal'>Ancien mot de passe *</label>
                    <Field name='oldPassword' type='password' className='border border-zinc-400'/>
                    <ErrorMessage name='oldPassword'>
                        {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                    </ErrorMessage>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='newPassword' className='text-sm font-normal'>Nouveau mot de passe *</label>
                    <Field name='newPassword' type='password' className='border border-zinc-400'/>
                    <ErrorMessage name='newPassword'>
                        {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                    </ErrorMessage>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='confirmPassword' className='text-sm font-normal'>Confirmation du nouveau mot de passe *</label>
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
                <button type='button' onClick={() => navigate(-1)} className="bg-dark border-0  text-white hover:bg-red-500 hover:text-white py-3 font-manuale text-sm font-normal mt-3">
                Annuler
                </button>
        </Form>
        </Formik>
    </div>
    );
};

export default UpdatePasswordView;