import React, { useMemo } from "react";
import CardHeader from "../CardHeaderComponent/CardHeader";
import "./MovesStyle.css"
import MovesCard from "../MovesCardComponent/MovesCard";

const Moves = (props) => {

  const moveList = useMemo(() => {
    return props?.pokemonData?.moves?.slice(0,9).map((move) => {
      return ( <MovesCard
        key={move.move.name}
        name={move.move.name}
      />
      );
    });
  }, [props?.pokemonData])

  return (
    <div className="bb">
        <div className="mainContainer2">
            <CardHeader/>
            <div className="movesContainer2">
              {moveList}
            </div>
        </div>
    </div>
  )
}

export default Moves;