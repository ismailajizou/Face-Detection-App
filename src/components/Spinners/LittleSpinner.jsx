import React from 'react';
import "./LittleSpinner.css"


const LittleSpinner = () => {
    return ( 
        <div  className="loadingio-spinner-spinner-0y2963fv8szb">
            <div className="ldio-7524fg2gxx">
                {
                    [...Array(11)].map((e, i )=> <div key={i}></div>)
                }
            </div>
        </div>

     );
}
 
export default LittleSpinner;