class PokemonPageServices {
  static async fetchPokemonById(name) {
    try {
      const response = await fetch(
        `https://localhost:7189/api/pockemon/${name}`,
        {
          method: "GET",
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
    }
    catch (error) {
      console.log(error);
    }
  }
}

export default PokemonPageServices;