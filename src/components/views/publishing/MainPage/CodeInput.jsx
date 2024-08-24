import React from 'react';
import { useFormContext } from 'react-hook-form';

function CodeInput({ index, codeRef, handleInputChange }) {
  const { register, setValue } = useFormContext();

  return (
    <input
      type='text'
      {...register(`${index}`, {
        setValueAs: v => v || '', 
        onChange: (e) => {
          handleInputChange(index, e);
          setValue(`${index}`, e.target.value);
        }
      })}
      ref={el => {
        codeRef.current[index] = el;
      }}
      maxLength={1}
    />
  );
}

export default CodeInput;
