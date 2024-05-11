import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../PageHeaderComponent/PageHeader";
import PageLayout from "../PageLayoutComponent/PageLayout";
import MainPageService from "../../../../services/MainPageService"; 

const MainPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [pockemonData, setPokemonData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [fetchState, setFetchState] = useState(false);
  const [isMyFetching,setIsFetchingDown]=useState(false)

  const writePokemons = useCallback((pockemons) => {
    const pockemonsSet = new Set([...pockemonData.map((pok) => pok.id)]);
    return [...pockemonData, ...(pockemons ?? []).filter((pok) => !pockemonsSet.has(pok.id))]
  }, [pockemonData])

  const initialFetch = useCallback(async () => {
    setFetchState(true);
    if (searchValue.length > 0) {
      const responseData = await MainPageService.fetchPockemonsBySearch(searchValue, page);
      const prepPockemonData = writePokemons(responseData?.pockemons ?? []);
      setPokemonData([...prepPockemonData]);
      setTotalCount(responseData?.totalCount);
    } else {
      const responseData = await MainPageService.fetchPockemons(page);
      const prepPockemonData = writePokemons(responseData?.pockemons ?? []);
      setPokemonData([...prepPockemonData]);
      setTotalCount(responseData?.totalCount);
    }
    setFetchState(false);
  }, [page, searchValue])


  const onSearchHandle = async () => {
    setPage(1);
    setPokemonData([]);
    if (searchValue.length > 0) {
      const response = await MainPageService.fetchPokemonsBySearch(searchValue, 1);
      setPokemonData([...(response?.pockemons ?? [])]);
    } else {
      initialFetch()
    }
  }

  useEffect(() => {
      initialFetch();
  }, [page, initialFetch]);


  useEffect(()=>{
    if(isMyFetching)
    {
      setPage(page+1)
      setIsFetchingDown(false)
    }
  },[isMyFetching])


  const scrollHandler=(e)=>{
    if(e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop-window.innerHeight < 50
      && totalCount !== pockemonData.length
      && !fetchState)
    {
        setIsFetchingDown(true)
        window.scrollTo(0,(e.target.documentElement.scrollHeight + e.target.documentElement.scrollTop));
    }
}

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler)

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    }
  },[])

  return (
    <>
      <PageHeader
        title="Who you are looking for?"
        searchValue={searchValue}
        onChangeSearch={setSearchValue}
        onSearch={onSearchHandle}
      />
      <PageLayout
        data={pockemonData}
      />
    </>
  )
};

export default MainPage;