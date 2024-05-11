import React from "react";
import ProgressBar from "../ProgressBarComponent/ProgressBar";
import "./StatsComponentStyle.css"

function capitalizeFirstLetter(str) {
    if (str?.length === 0) {
      return str;
    }
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }

  function formatNumber(num) {
    return num?.toString().padStart(3, '0');
}

const StatsComponent = (props)  => {
  return (
    <div className="leftContainer">
        <div className="Namer">
            <p>#{formatNumber(props.id)}</p>
            <h1>{capitalizeFirstLetter(props.name)}</h1>
        </div>
        <div className="pokemonStats">
            <ProgressBar label="HP" value={props.pokemonStats["HP"]} color='rgb(90, 190, 121)' />
            <ProgressBar label="Attack" value={props.pokemonStats["Attack"]} color='rgb(218, 62, 44)' />
            <ProgressBar label="Defense" value={props.pokemonStats["Defense"]} color='rgb(245, 215, 66)' />
            <ProgressBar label="Speed" value={props.pokemonStats["Speed"]} color='rgb(300, 170, 60)' />   
        </div>
    </div>
  )
}

export default StatsComponent;