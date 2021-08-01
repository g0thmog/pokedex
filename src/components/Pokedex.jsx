import { useEffect, useState } from "react";
import { Grid, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import pokedex from "../assets/pokedex.png";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    marginTop: 100,
    marginBottom: 50,
  },

  appBar: {
    backgroundColor: orange[500],
  },

  logo: {
    maxHeight: 220,
    maxWidth: 220,
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  background: {
    background: "linear-gradient(to top right, #87ceeb, #af97f0 120%) fixed",
  },
}));

const Pokedex = (props) => {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`).then((res) => {
      setPokemonData(res.data.results); //get Kanto region pokemons
    });
  }, []);

  return (
    <>
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <div className={classes.header}>
            <img src={pokedex} alt="logo" className={classes.logo} />
          </div>
        </AppBar>
        <Grid
          container
          className={classes.pokedexContainer}
          justifyContent="center"
        >
          {pokemonData.map((pokemonData) => (
            <PokemonCard
              key={pokemonData.name}
              name={pokemonData.name}
              url={pokemonData.url}
            />
          ))}
        </Grid>
        <AppBar position="fixed" className={classes.appBar} />
      </div>
    </>
  );
};

export default Pokedex;
