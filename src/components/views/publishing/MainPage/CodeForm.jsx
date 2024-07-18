import React, { useEffect, useRef } from 'react';
import { GoDash } from "react-icons/go";
import CodeInput from './CodeInput';

import "./LectureList.css";

function CodeForm() {
  const codeRef = useRef([]);

  useEffect(() => {
    if (codeRef.current[0]) {
      codeRef.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, e) => {
    if (e.target.value && index < codeRef.current.length - 1) {
      codeRef.current[index + 1].focus();
    }
  };

  const codeInputs = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => (
      <CodeInput 
        key={start + i}
        index={start + i}
        codeRef={codeRef}
        handleInputChange={handleInputChange}
      />
    ));
  };

  return (
    <div className='codeInput'>
      <div className='codeInput__wrapper'>
        {codeInputs(0, 3)}
      </div>
      <div className='codeInput__wrapper'>
        <GoDash />
      </div>
      <div className='codeInput__wrapper'>
        {codeInputs(4, 7)}
      </div>
    </div>
  );
}

export default CodeForm;
