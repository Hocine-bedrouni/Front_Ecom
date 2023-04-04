import React from 'react';
import { Field, ErrorMessage } from 'formik';

const RegisterInputs = () => {
    const civilityOptions = [
        { key: 'M', value: 'MR' },
        { key: 'Mme', value: 'MRS' },
        { key: 'Société', value: 'COMPANY' },
        { key: 'Autre', value: 'OTHER' }
      ]


    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='text-sm font-normal'>Adresse e-mail *</label>
                <Field name='email' type='text' className='border border-zinc-400' />
                <ErrorMessage name='email'>
                    {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                </ErrorMessage>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='password' className='text-sm font-normal'>Mot de passe *</label>
                <Field name='password' type='password' className='border border-zinc-400' />
                <ErrorMessage name='password'>
                    {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                </ErrorMessage>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='confirmPassword' className='text-sm font-normal'>Confirmation du mot de passe *</label>
                <Field name='confirmPassword' type='password' className='border border-zinc-400' />
                <ErrorMessage name='confirmPassword'>
                    {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                </ErrorMessage>
            </div>
            <div className='flex flex-col md:flex-row md:items-center gap-5'>
                <label htmlFor='civility' className='text-sm font-normal
                    '>Civilité *:</label>
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
                <ErrorMessage name='civility'>
                    {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                </ErrorMessage>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='name' className='text-sm font-normal'>Nom *</label>
                <Field name='name' type='text' className='border border-zinc-400' />
                <ErrorMessage name='name'>
                    {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                </ErrorMessage>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='firstName' className='text-sm font-normal'>Prénom *</label>
                <Field name='firstName' type='text' className='border border-zinc-400' />
                <ErrorMessage name='firstName'>
                    {msg => <span className='text-red-500 text-sm'>{msg}</span>}
                </ErrorMessage>
            </div>
        </div>
    );
};

export default RegisterInputs;