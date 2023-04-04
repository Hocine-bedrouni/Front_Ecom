import React from 'react';
import { Field, ErrorMessage} from 'formik';

const AddressInputs = (props) => {
    const {postalCodeFieldName, cityFieldName, streetFieldName} = props

    return (
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-2'>
            <label htmlFor={postalCodeFieldName} className='text-sm font-normal'>Code postal *</label>
            <Field name={postalCodeFieldName} type='text' className='border border-zinc-400'/>
            <ErrorMessage name={postalCodeFieldName}>
                {msg => <span className='text-red-500 text-sm'>{msg}</span>}
            </ErrorMessage>
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor={cityFieldName} className='text-sm font-normal'>Ville *</label>
            <Field name={cityFieldName} type='text' className='border border-zinc-400'/>
            <ErrorMessage name={cityFieldName}>
                {msg => <span className='text-red-500 text-sm'>{msg}</span>}
            </ErrorMessage>
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor={streetFieldName} className='text-sm font-normal'>Rue *</label>
            <Field name={streetFieldName} type='text' className='border border-zinc-400'/>
            <ErrorMessage name={streetFieldName}>
                {msg => <span className='text-red-500 text-sm'>{msg}</span>}
            </ErrorMessage>
        </div>
      </div>
    );
};

export default AddressInputs;