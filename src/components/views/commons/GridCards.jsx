import React from 'react';
import { Link } from 'react-router-dom';

function GridCards() {
  return (
    <Link to={`/leture`}>
        <div className="lecture_list_class">
                <div className="class_tag">
                        <h5 style={{color: 'black'}}>한|일</h5>
                    </div>
                <h4 style={{ margin: '10px' , color: 'black'}}>한중통역 1분반</h4>
                <h5 style={{ margin: '10px', color: 'skyblue' }}>D-6</h5>
        </div>
    </Link>
  )
}

export default GridCards
