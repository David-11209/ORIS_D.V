import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../PageHeaderComponent/PageHeader";
import PageLayout from "../PageLayoutComponent/PageLayout";

const MainPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [fetchState, setFetchState] = useState(false);

  const fetchPokemons = async (limit) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`, {
            method: "GET"
        });

        if (response.status === 200) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.warn(error);
        alert('Покемонов не будет');
    }
  };

  const filterData = useCallback(() => {
    if (searchValue.length > 0) {
      const filteredData = pokemonData.filter(pokemon => {
        return pokemon.name.includes(searchValue.toLowerCase());
      });
      return filteredData;
    } else {
      return pokemonData;
    }
  }, [searchValue, pokemonData]);
  
  useEffect(() => {
    const initialFetch = async () => {
      setFetchState(true);
      const response = await fetchPokemons(page * 40);
      setPokemonData(response?.results ?? []);
      setTotalCount(response?.count);
      setFetchState(false);
    }
    initialFetch()
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight)
        && totalCount !== pokemonData.length
        && !fetchState
        )
      {
        setPage(prev => prev + 1);
      }
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [fetchState, pokemonData.length, totalCount])

  return (
    <>
      <PageHeader
        title="Who you are looking for?"
        searchValue={searchValue}
        onChangeSearch={setSearchValue}
      />
      <PageLayout
        data={filterData()}
      />
    </>
  )
};

export default MainPage;