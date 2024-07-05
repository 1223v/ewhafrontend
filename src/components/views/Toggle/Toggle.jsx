import React from 'react';

import classNames from 'classnames';
import "./Toggle.css";

export const Toggle = ({ on, setToggle, fetchLectureCode }) => {
  const changeToggle = async () => {
    const res = await setToggle(!on);
    console.log(res);
    if (res.isSuccess) {
      fetchLectureCode();
    }
  }

  return (
    <label aria-label={"Toggle"} style={{ display: "block" }}>
      <input
        className="toggle-input"
        type="checkbox"
        checked={on}
        onChange={changeToggle}
        data-testid="toggle-input"
      />
      <span
        className={classNames('toggle-btn', { on, off: !on })}
      />
    </label>
  )
}