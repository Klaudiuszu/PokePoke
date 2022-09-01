import { useEffect, useMemo, useState } from "react";
import React from "react";
import axios from "axios";
import Particles from "react-tsparticles";
import { motion, useMotionValue, useTransform } from "framer-motion";

import FilterPokemon from "../../components/FilterProduct/FilterPokemon";

import FilterCards from "../../components/FilterProduct/FilterCards";

import { images } from "../../utils";
import "./Header.scss";

function Header() {
  const [limit, setLimit] = useState(100);
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonLIst] = useState<any[]>([]);
  const [detailsPokemon, setDetailsPokemon] = useState<any[]>([]);
  const [filterElement, setFilterElement] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      let response: any;
      let detailsResponse: any;

      try {
        response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        setPokemonLIst(response.data.results);
      } catch (err) {
        console.log(err);
      }

      try {
        detailsResponse = await Promise.all(
          response.data.results.map((item: any) => {
            return axios.get(item.url);
          })
        );
      } catch (err) {
        console.log(err);
      }
      const resData = detailsResponse.map((item: any) => item.data);
      setDetailsPokemon(resData);
    };

    fetchPokemons();
  }, [limit, offset]);

  //------------------------------------------
  //znalazlem rozwiązanie na filtrowanie elementów, stan filtered Pokemons powinien wyświetlać mi elementy przefiltrowane po kliknięciu natomiast wlaśnie nie wiem jak przekazać ten stan z filterPokemon. Wcześniej miałem to wszystko w jednym komponencie ale to filtrowanie raz działalo raz nie działało
  const filterPokemons = (event :any) => {
      const filteredPokemons = detailsPokemon.filter(
        pokemon => (`${pokemon.types[0].type.name}`.toLowerCase().includes(filterElement))
      );
      setDetailsPokemon(filteredPokemons)
      console.log(detailsPokemon)
    };

    console.log(filterPokemons)



  //------------------------------------------

  return (
    <div className="app__Header">
      <div className="app__Header-content">
        <div className="app__Header-list">
          <h2>Filter by type:</h2>
          <FilterPokemon 
          setFilterPokemons= {setFilterElement}
          
          />

          <div className="button-fetch">
            <button>See pokemons!</button>
          </div>
        </div>

        <div className="app__Header-display">
          {detailsPokemon.map((pokemon, index) => (
            <FilterCards 
            detailsPokemon={pokemon} 
            key={index} 
            />
          ))}
          {/* {detailsPokemon.map((item) => (
            <div key={item.id} className="app__Header-card">
              <div className="app__Header-img">
                <img src={item.sprites.front_default} />
              </div>
              <div className="app__Header-content">
                <tr>
                  <td>name:</td>
                  <td>{item.name}</td>
                </tr>
                <tr>
                  <td>type:</td>
                  <td>{item.types[0].type.name}</td>
                </tr>
                <tr>
                  <td>weight:</td>
                  <td>{item.weight}</td>
                </tr>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Header;
