import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, HTMLTable, Tag, Tooltip, InputGroup, NonIdealState } from "@blueprintjs/core";
import { freePokemon, catchPokemon, getPokemons, setPokemonLevel, getPokemonsWithNameContaining } from "../api/pokemon";

const PokemonTable = styled(HTMLTable)`
  width: 100%;
  margin-top: 1rem;
`;

export const PokemonPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [shouldRefresh, refresh] = useState(false);

  const handleCatchPokemon = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 150) + 1);
    const json = await response.json();
    const pokemon = {
      id: json.id,
      name: json.name[0].toUpperCase() + json.name.slice(1),
      level: Math.floor(Math.random() * 10) + 1,
      image: json.sprites.front_default,
      types: json.types.map((t) => t.type.name),
    };
    await catchPokemon(pokemon);
    refresh(true);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleIncreaseLevel = async (pokemon) => {
    await setPokemonLevel(pokemon.id, pokemon.level + 1);
    refresh(true);
  };

  const handleFreePokemon = async (id) => {
    await freePokemon(id);
    refresh(true);
  };

  useEffect(() => {
    refresh(false);
    if (search) {
      getPokemonsWithNameContaining(search).then((results) => {
        setPokemons(results);
      });
    } else {
      getPokemons().then((results) => {
        setPokemons(results);
      });
    }
  }, [shouldRefresh, search]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button text="Catch new Pokemon" onClick={handleCatchPokemon} />
        <InputGroup
          leftIcon="search"
          placeholder="Filter Pokemons..."
          type="search"
          onChange={handleSearch}
        ></InputGroup>
      </div>

      {pokemons.length > 0 ? (
        <PokemonTable condensed striped>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Types</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map((pokemon) => (
              <tr key={pokemon.id}>
                <td style={{ whiteSpace: "nowrap", verticalAlign: "middle" }}>
                  <img src={pokemon.image} alt={pokemon.name} style={{ width: "96px" }}></img>
                </td>
                <td style={{ whiteSpace: "nowrap", verticalAlign: "middle" }}>
                  <p>{pokemon.name}</p>
                  <p>Level {pokemon.level}</p>
                </td>
                <td style={{ width: "100%", verticalAlign: "middle" }}>
                  {pokemon.types.map((type) => (
                    <Tag round key={type} style={{ marginRight: "0.5rem" }}>
                      {type}
                    </Tag>
                  ))}
                </td>
                <td style={{ whiteSpace: "nowrap", verticalAlign: "middle" }}>
                  <Tooltip content="Give the pokemon a rare candy and increase its level by 1.">
                    <Button icon="new-object" onClick={() => handleIncreaseLevel(pokemon)} />
                  </Tooltip>
                  <Button icon="delete" onClick={() => handleFreePokemon(pokemon.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </PokemonTable>
      ) : (
        <NonIdealState
          title="No Pokemon Found"
          description="Change your search terms, or start catching some pokemon!"
        ></NonIdealState>
      )}
    </>
  );
};
