import React from 'react';
import { GoDash } from "react-icons/go";

function StudentCodeItem({ code }) {
  const [first, second] = code?.split("-");
  
  return (
    <div className='studentCodeItem'>
      <div className='studentCodeItem__wrapper'>
        {[...first]?.map((c, i) => 
          <span key={i} className='studentCodeItem__num'>{c}</span>
        )}
      </div>
      <div className='studentCodeItem__wrapper'>
        <GoDash />
      </div>
      <div className='studentCodeItem__wrapper'>
        {[...second]?.map((c, i) => 
          <span key={i} className='studentCodeItem__num'>{c}</span>
        )}
      </div>
    </div>
  )
}

export default StudentCodeItem