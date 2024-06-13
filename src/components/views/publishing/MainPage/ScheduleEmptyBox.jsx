import React from 'react'
import { IMAGES } from '../../../../constants/image'
import { MAIN } from '../../../../constants/text'

export const ScheduleEmptyBox = () => {
  return (
    <div className="scheduleEmptyBox">
      <img 
        src={IMAGES.calendar}
        alt='calendar'
      />
      <span>{MAIN.TXT.empty}</span>
    </div>
  )
}