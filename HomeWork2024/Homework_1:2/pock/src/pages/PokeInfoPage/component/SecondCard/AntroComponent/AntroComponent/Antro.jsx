import React from "react";
import "./AntroStyle.css";
import Height from "../../HeightComponent/Height";
import Weight from "../../WeightComponent/Weight";
import Breeding from "../../BreedingComponent/Breeding";


const Antro = ({height, weight}) => {

  return (
    <div className="bb">
      <div className="antro">
        <Breeding/>
        <div className="data">
          <Height
            height={height}
          />
          <Weight
            weight={weight}
          />
        </div>
      </div>
    </div>
  );
};

export default Antro;