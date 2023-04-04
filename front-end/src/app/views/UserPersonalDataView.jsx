import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import { fetchAccount, updateAccount } from '../api/backend/account';
import { useSelector, useDispatch} from 'react-redux'
import { useState, useEffect } from 'react';
import { selectUser, signOut } from '../redux-store/authenticationSlice';
import { Link, useNavigate } from 'react-router-dom';
import { URL_MY_ACCOUNT, URL_UPDATE_PASSWORD } from '../constants/urls/urlFrontEnd';

const UserPersonalDataView = () => {
  const user = useSelector((state) => selectUser(state));
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [accountData, setAccountData] = useState({});

  const [initialValues, setInitialValues] = useState(
  {
      name: "",
      firstName: "",
      email: "",
      civility: ""
  })

  const civilityOptions = [
    { key: 'M', value: 'MR' },
    { key: 'Mme', value: 'MRS' },
    { key: 'Société', value: 'COMPANY' },
    { key: 'Autre', value: 'OTHER' }
  ]

  const validationSchema = Yup.object().shape({
      name: Yup.string()
          .matches(/^[a-zA-Z]([._](?![._])|[a-zA-Z]){4,30}[a-zA-Z]$/, 'nom incorrecte')
          .min(2, "Trop petit")
          .max(50, "Trop long!")
          .required("Ce champ est obligatoire"),
      firstName: Yup.string()
          .matches(/^[a-zA-Z]([._](?![._])|[a-zA-Z]){4,30}[a-zA-Z]$/, 'nom incorrecte')
          .min(2, "Trop petit")
          .max(50, "Trop long!")
          .required("Ce champ est obligatoire"),
      email: Yup.string()
          .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'mauvaise adresse email')
          .email("E-mail invalide")
          .required("L'email est obligatoire"),
  });

  useEffect(() => {
    // Chargement des données personnelles au premier rendu
    fetchAccount(user.id).then((res) => {
      setAccountData(res.data)
      setInitialValues({
        name: res.data.name,
        firstName: res.data.firstName,
        email: res.data.email,
        civility: res.data.civility
      });
    }).catch(() => {
      toast.error('Erreur lors du chargement des données.');
    })
  }, [])
  
  
  const handleSubmit = (values) => {
    const changedEmail = accountData.email !== values.email;
    // Repasser l'intégralité des données existantes agrémentées des nouvelles 
    updateAccount(user.id, 
      {
        ...accountData,
        firstName: values.firstName,
        name: values.name,
        email: values.email,
        civility: values.civility
      }
      ).then((res) => {
        // Forcer l'utilisateur à se reconnecter si il a modifié son email
        if(changedEmail) {
            dispatch(signOut())
        }
        toast.success("Mise à jour effectuée")
        navigate(URL_MY_ACCOUNT)
      }).catch(() => {
        toast.error('Erreur lors de la mise à jour des données');
      })
  };
  
  return (
      <div className='flex justify-center items-center min-h-full p-10'>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
              <Form className='font-manuale flex flex-col gap-5 border border-zinc-300 p-10 w-4/5 lg:w-1/3 text-dark'>
                <h2 className='text-2xl text-center'>Données personnelles</h2>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='email' className='text-sm font-normal'>Adresse e-mail *</label>
                    <Field name='email' type='text' className='border border-zinc-400 disabled:bg-zinc-200' disabled/>
                    <ErrorMessage name='email'>
                        {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                    </ErrorMessage>
                </div>
                <Link to={URL_UPDATE_PASSWORD} className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Modifier le mot de passe</Link>
                <div className='flex flex-col md:flex-row md:items-center gap-5'>
                    <label htmlFor='civility' className='text-sm font-normal
                    '>Civilité*:</label>
                    <Field name='civility' >
                    {({ field }) => {
                    return civilityOptions.map(option => {
                        return (
                        <div className='flex items-center gap-1' key={option.key}>
                            <input
                            type='radio'
                            id={option.value}
                            {...field}
                            value={option.value}
                            checked={field.value === option.value}
                            className='text-dark'
                            />
                            <label htmlFor={option.value} className='text-sm font-normal'>{option.key}</label>
                        </div>
                        )
                    })
                    }}
                </Field>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='name' className='text-sm font-normal'>Nom *</label>
                    <Field name='name' type='text' className='border border-zinc-400'/>
                    <ErrorMessage name='name'>
                        {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                    </ErrorMessage>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='firstName' className='text-sm font-normal'>Prénom *</label>
                    <Field name='firstName' type='text' className='border border-zinc-400'/>
                    <ErrorMessage name='firstName'>
                        {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                    </ErrorMessage>
                </div>
                <Button  className='bg-dark border-0 text-white hover:bg-dark-light hover:text-white py-3 font-manuale text-sm font-normal mt-3'>Modifier</Button>
                <div className="flex w-full items-center text-dark">
                <hr className="w-full border-zinc-400" />
                <span className="mx-5 font-manuale text-sm">ou</span>
                <hr className="w-full border-zinc-400" />

                </div>
                <button onClick={() => navigate(URL_MY_ACCOUNT)} className="bg-dark border-0  text-white hover:bg-red-500 hover:text-white py-3 font-manuale text-sm font-normal mt-3">
                Annuler 
                </button>
              </Form>
          </Formik>
      </div>
  );
}

export default UserPersonalDataView