import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const PasswordInput = ({
  title,
  name,
  onSubmit
}) => {
  const { register, formState: { errors }, handleSubmit } = useFormContext();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // if (name === "newPwChk") {
      //   console.log("!");
      //   handleSubmit(onSubmit);
      // }
    }
  };

  return (
    <div className='passwordInput'>
      <span>{title}</span>
      <div>
        <span>
          <input 
            type='password'
            {...register(name, {
              required: '필수 입력값입니다.'
            })}
            className={errors[name] && "error"}
            onKeyDown={handleKeyDown}
          />
        </span>
        <span className={classNames('error-massage', { display: errors[name] })}>
          <span>{errors[name]?.message ? errors[name]?.message : "&nbsp;"}</span>
        </span>
      </div>
    </div>
  )
}