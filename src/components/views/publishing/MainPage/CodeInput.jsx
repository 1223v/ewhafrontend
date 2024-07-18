import React from 'react';
import { useFormContext } from 'react-hook-form';

function CodeInput({ index, codeRef, handleInputChange }) {
  const { register } = useFormContext();

  return (
    <input
      type='text'
      ref={el => codeRef.current[index] = el}
      maxLength={1}
      {...register(`${index}`)}
      onChange={(e) => {
        handleInputChange(index, e);
      }}
    />
  );
}

export default CodeInput;
