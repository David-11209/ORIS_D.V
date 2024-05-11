import React from "react";

class MainPageService {
  static async fetchPockemons(page) {
    try {
      const response = await fetch(`https://localhost:7189/api/Pockemon?page=${page}`, {
        method: "GET",
      });

      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
    }
    catch (error) {
      console.warn(error)
      alert('Поскеманов не будэт')
    }
  }

  static async fetchPockemonsBySearch(search, page) {
    try {
      const response = await fetch(
        `https://localhost:7189/api/Pockemon/GetByFilter?page=${page}&search=${search}`, {
          method: "GET",
        });
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
    }
    catch (error) {
      console.warn(error)
      alert('Покеманов не будэт')
    }
  }
}

export default MainPageService;