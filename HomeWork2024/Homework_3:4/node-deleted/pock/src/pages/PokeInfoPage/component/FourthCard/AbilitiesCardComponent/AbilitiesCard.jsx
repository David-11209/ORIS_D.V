import React from "react";
import "./AbilitiesCardStyle.css"

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

function getRandomColor(colorMap) {
    const keys = Object.keys(colorMap);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return colorMap[randomKey];
}

const AbilitiesCard = (props) => {
const color = getRandomColor(colorMap)
  return (
    <div className="rectangle2" style={{backgroundColor: color}}>
        <div className="icon1" style={{color: color}}>
            <p> {props?.name[0]}</p>
        </div>
        <div className="text1">{props?.name}</div>
    </div>
  )
}

export default AbilitiesCard;