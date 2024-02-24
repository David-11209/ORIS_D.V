import React from "react";
import "./WeightStyle.css";

const Weight = ({weight}) => {
  return (
<div className="w_blk">
    <p className="lb">Weight</p>
    <div className="num">
        <p>{(weight * 2.2 / 10).toFixed(1)} lbs </p>
        <p>{weight} kg</p>
    </div>
</div>
  );
};

export default Weight;