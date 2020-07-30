import React, { useState, useEffect } from "react";
import { Button, HTMLTable, Tag, Tooltip, InputGroup, NonIdealState } from "@blueprintjs/core";
import { freePokemon, catchPokemon, getPokemons, setPokemonLevel, getPokemonsWithNameContaining } from "../api/pokemon";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  topBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  table: {
    width: "100%",
    marginTop: "1rem",
  },
  centered: {
    textAlign: "center",
  },
  collapsingColumn: {
    whiteSpace: "nowrap",
    verticalAlign: "middle !important",
  },
  expandingColumn: {
    width: "100%",
    verticalAlign: "middle !important",
  },
  typeTag: {
    marginRight: "0.5rem",
  },
  notFound: {
    marginTop: "2rem",
  },
});

export const PokemonPage = () => {
  const classes = useStyles();
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleCatchPokemon = async () => {
    setLoading(true);
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
    setLoading(false);
    refreshPokemons();
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleIncreaseLevel = async (pokemon) => {
    await setPokemonLevel(pokemon.id, pokemon.level + 1);
    refreshPokemons();
  };

  const handleFreePokemon = async (id) => {
    await freePokemon(id);
    refreshPokemons();
  };

  const refreshPokemons = () => {
    if (search) {
      getPokemonsWithNameContaining(search).then((results) => {
        setPokemons(results);
      });
    } else {
      getPokemons().then((results) => {
        setPokemons(results);
      });
    }
  };

  useEffect(() => {
    refreshPokemons(search);
  }, [search]);

  return (
    <>
      <div className={classes.topBar}>
        <Button loading={isLoading} text="Catch new Pokemon" onClick={handleCatchPokemon} />
        <InputGroup
          leftIcon="search"
          placeholder="Filter Pokemons..."
          type="search"
          onChange={handleSearch}
        ></InputGroup>
      </div>

      {pokemons.length > 0 ? (
        <HTMLTable condensed striped className={classes.table}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Types</th>
              <th className={classes.centered}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map((pokemon) => (
              <tr key={pokemon.id}>
                <td className={classes.collapsingColumn}>
                  <img src={pokemon.image} alt={pokemon.name}></img>
                </td>
                <td className={classes.collapsingColumn}>
                  <p>{pokemon.name}</p>
                  <p>Level {pokemon.level}</p>
                </td>
                <td className={classes.expandingColumn}>
                  {pokemon.types.map((type) => (
                    <Tag round key={type} className={classes.typeTag}>
                      {type}
                    </Tag>
                  ))}
                </td>
                <td className={classes.collapsingColumn}>
                  <Tooltip content="Give the pokemon a rare candy and increase its level by 1.">
                    <Button icon="new-object" onClick={() => handleIncreaseLevel(pokemon)} />
                  </Tooltip>
                  <Button icon="delete" onClick={() => handleFreePokemon(pokemon.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      ) : (
        <NonIdealState
          className={classes.notFound}
          title="No Pokemons Found"
          description="Change your search terms, or start catching some pokemon!"
        ></NonIdealState>
      )}
    </>
  );
};
