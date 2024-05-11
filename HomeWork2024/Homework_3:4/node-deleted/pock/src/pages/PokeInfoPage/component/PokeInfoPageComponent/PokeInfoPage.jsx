import React, {useEffect, useState } from "react";
import Antro from "../SecondCard/AntroComponent/AntroComponent/Antro";
import { useParams } from "react-router-dom";
import PageHeader from "../PageHeaderComponent/PageHeader";
import Ability from "../FirstCard/AbilityComponent/Ability";
import Moves from "../ThirdCard/MovesComponent/Moves";
import Abilities from "../FourthCard/AbilitiesComponent/Abilities";
import PokemonPageServices from "../../../../services/PockemonPageService"

const PokeInfoPage = () => {
  const [pokemonData, setPokemonData] = useState({});
  let {name} = useParams()

  useEffect(() => {
    const initialFetch = async () => {
      if (name) {
        const response = await PokemonPageServices.fetchPokemonById(name);
        setPokemonData(response);
      }
    }
    initialFetch();
  }, [name]);

  const pokemonStats = {};

pokemonData?.stats?.forEach(stat => {
    switch (stat.stat.name) {
        case 'hp':
            pokemonStats['HP'] = stat.base_stat;
            break;
        case 'attack':
            pokemonStats['Attack'] = stat.base_stat;
            break;
        case 'defense':
            pokemonStats['Defense'] = stat.base_stat;
            break;
        case 'speed':
            pokemonStats['Speed'] = stat.base_stat;
            break;
        default:
            break;
    }
});
  return (
    <>
      <PageHeader/>
      {pokemonData && (
        <div className="superMainContainer">
          <Ability
        id={pokemonData.id}
        name={pokemonData.name}
        typesArray={pokemonData.types}
        pokemonImage={pokemonData?.sprites?.other.home.front_default ??
            pokemonData?.sprites?.front_default}
        pokemonStats={pokemonStats}
        />
        <Antro
          height={pokemonData?.height}
          weight={pokemonData?.weight}
        />
        <Moves
          pokemonData={pokemonData}
        />
        <Abilities
          pokemonData={pokemonData}
        />
        </div>
      )}
    </>
  );
};

export default PokeInfoPage;