import React from 'react';
import { useFormContext } from 'react-hook-form';

export const PasswordInput = ({
  title,
  name
}) => {
  const { register } = useFormContext();
  return (
    <div className='passwordInput'>
      <span>{title}</span>
      <div>
        <span>
          <input 
            type='password'
            {...register(name)}
          />
        </span>
        <span></span>
      </div>
    </div>
  )
}