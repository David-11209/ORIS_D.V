import React from "react";
import "./HeightStyle.css";

function formatNumber(num) {
    return num?.toString().padStart(2, '0');
  }
const Height = ({height}) => {
    const foots = Math.floor((height * 10) / 30.48 )
    const duims = Math.ceil((height * 10 - foots * 30.48) / 2.54) 
  return (
<div className="h_blk">
          <div>
            <p className="lb">Height</p>
          </div>
          <div className="num">
              <p>{foots}'{formatNumber(duims)}"</p>
              <p>{height} m</p>
          </div>
      </div>
  );
};

export default Height;