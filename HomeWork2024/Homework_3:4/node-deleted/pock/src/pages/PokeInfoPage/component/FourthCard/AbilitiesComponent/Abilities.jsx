import React, { useMemo } from "react";
import CardHeader from "../CardHeaderComponent/CardHeader";
import "./AbilitiesStyle.css"
import AbilitiesCard from "../AbilitiesCardComponent/AbilitiesCard";

const Abilities = (props) => {

  const abilitiesList = useMemo(() => {
    return props?.pokemonData?.abilities?.map((abilities) => {
      return ( <AbilitiesCard
        key={abilities.ability.name}
        name={abilities.ability.name}
      />
      );
    });
  }, [props?.pokemonData])

  return (
    <div className="bb">
        <div className="mainContainer3">
            <CardHeader/>
            <div className="abilitiesContainer3">
              {abilitiesList}
            </div>
        </div>
    </div>
  )
}

export default Abilities;