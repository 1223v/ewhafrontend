import React,{useState} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import styled from 'styled-components';

function CalenderComponent() {

  const [value, onChange] = useState(new Date());

  
  return (
    <div>
      <Calendar onChange={onChange} value={value} formatDay ={(locale, date) => dayjs(date).format('DD')}/>
         
    </div>
  )
}

export default CalenderComponent

