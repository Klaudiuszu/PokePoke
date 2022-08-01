import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Particles from "react-tsparticles";
import { motion, useMotionValue, useTransform } from "framer-motion";

import { images } from "../../utils";
import "./Header.scss";

function Header() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonLIst] = useState<any[]>([]);
  const [detailsPokemon, setDetailsPokemon] = useState<any[]>([]);
  const [value, setValue] = useState("");

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

  const [items, setItems] = useState(detailsPokemon);

  const filterItem = (categItem: string) => {
    const updatedItems = detailsPokemon.filter((currentElement) => {
        return currentElement.types[0].type.name === categItem;
    });
    setItems(updatedItems);
    console.log("dzial")
  }

  console.log(detailsPokemon);

  return (
    <div className="app__Header">
      <div className="app__Header-content">
        <div className="app__Header-list">
          <h2>Filter by type:</h2>
          <div className="app__Header-select">
            <select id="default_select">
              <option value="No filter">No filter</option>
              <option 
                value="name"
                onChange={() => filterItem('name')}                
                >name</option>
              <option value="fighting">fighting</option>
              <option value="flying">flying</option>
              <option value="poison">poison</option>
              <option value="ground">ground</option>
              <option value="rock">rock</option>
              <option value="bug">bug</option>
              <option value="ghost">ghost</option>
              <option value="steel">steel</option>
              <option value="fire"
                onClick={() => filterItem('fire')
} 
                >fire</option>
              <option value="water">water</option>
              <option value="grass">grass</option>
              <option value="electric">electric</option>
              <option value="psychic">psychic</option>
              <option value="ice">ice</option>
              <option value="dragon">dragon</option>
              <option value="dark">dark</option>
              <option value="fairy">fairy</option>
            </select>
          </div>
          <div className="button-fetch">
            <button>See pokemons!</button>
          </div>
        </div>
        <div className="app__Header-display">
        {detailsPokemon.map((elem) => {
          const { id, name, weight, front_default } = elem;

          return (
              <div key={id} className="app__Header-card">
                <div className="app__Header-img">
                  <img src={elem.sprites.front_default} />
                </div>
                <div className="app__Header-content">
                  <tr>
                    <td>name:</td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td>type:</td>
                    <td>{elem.types[0].type.name}</td>
                  </tr>
                  <tr>
                    <td>weight:</td>
                    <td>{weight}</td>
                  </tr>
                </div>
              </div>
          );
        })}
        </div>

        {/* <div className="app__Header-display">
          {detailsPokemon.map((item) => (
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
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Header;
