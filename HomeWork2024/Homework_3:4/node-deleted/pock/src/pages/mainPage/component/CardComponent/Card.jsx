import React, { useState, useEffect } from "react";
import "./CardStyle.css";
import { Link } from "react-router-dom";

const colorMap = {
  bug: 'rgb(67, 148, 109)',
  dragon: 'rgb(97, 192, 181)',
  grass: 'rgb(90, 190, 121)',
  steel: 'rgb(143, 223, 171)',
  dark: 'rgb(67, 70, 73)',
  flying: 'rgb(142, 156, 171)',  
  normal: 'rgb(185, 142, 183)',
  ghost: 'rgb(145, 86, 157)',
  rock: 'rgb(91, 51, 21)',
  ground: 'rgb( 130, 88, 49)',
  fighting: 'rgb(184, 87, 33)',
  fire: 'rgb(218, 62, 44)',
  electric: 'rgb(245, 193, 66)',
  poison: 'rgb(104, 70, 246)',
  psychic: 'rgb(201, 42, 177)',
  fairy: 'rgb(218, 80, 105)',  
  water: 'rgb(74, 96, 229)',
  ice: 'rgb(163, 222, 237)',
};

function capitalizeFirstLetter(str) {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatNumber(num) {
  return num?.toString().padStart(3, '0');
}


const Card = ({ pockemon }) => {
  return (
    <Link to = {`/pokemon/${pockemon.name}`}>
      <div className="PokemonContainer" key={pockemon?.id}>
        {pockemon ? (
          <>
            <div className="CardTitleContainer">
              <p className="CardTitle">{capitalizeFirstLetter(pockemon.name)}</p>
              <p style={{color: "black"}}>{`#${formatNumber(pockemon?.id)}`}</p>
            </div>

            <img
              className="PokemonImage"
              src={
                pockemon?.imageUrl
              }
              alt="pokemon"
            />

            <div className="TypesContainer">
              {pockemon?.types.map((type, index) => (
                <p style={{backgroundColor: colorMap[type.type.name]}} className="Type" key={index}>
                  {capitalizeFirstLetter(type.type.name)}
                </p>
              ))}
            </div>
          </>
        ) : (
          <p>Покемон потерялся</p>
        )}
      </div>
    </Link>
    
  );
};

export default Card;