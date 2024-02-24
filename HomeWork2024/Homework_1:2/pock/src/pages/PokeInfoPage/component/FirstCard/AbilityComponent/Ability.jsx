import React from "react";
import StatsComponent from "../StatsComponent/StatsComponent";
import PokemonImage from "../PokemonImageComponent/PokemonImage";
import "./AbilityStyle.css"

const Ability = (props)  => {
  return (
    <div className="bb">
        <div className="mainContainer">
            <StatsComponent
                id = {props.id}
                name = {props.name}
                pokemonStats = {props.pokemonStats}
            />
            <PokemonImage
            typesArray = {props.typesArray}
            pokemonImage = {props.pokemonImage}
            />
        </div>
    </div>
  )
}

export default Ability;