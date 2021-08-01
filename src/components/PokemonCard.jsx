import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { toFirstCharUppercase } from "../utils";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "25vw",
    margin: 5,
    "&:hover": {
      transform: "scale3d(1.15, 1.15, 1.0)",
      transition: "all 0.5s ease-out;",
    },
  },
  cardContent: {
    textAlign: "center",
  },
  img: {
    maxWidth: 200,
    minHeight: 200,
    marginTop: 15,
    cursor: "pointer",
  },
}));

const PokemonCard = ({ name, url }) => {
  const history = useHistory();

  const [pokemonId, setPokemonId] = useState("");
  const [pokemonImage, setPokemonImage] = useState("");
  const classes = useStyles();

  useEffect(() => {
    setPokemonId(url.split("/")[url.split("/").length - 2]);

    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`).then((res) => {
      setPokemonImage(res.data.sprites.other.dream_world.front_default);
    });
  }, [url, pokemonId]);

  return (
    <Card
      className={classes.card}
      onClick={() => history.push(`/pokemon/${pokemonId}`)}
    >
      <Box textAlign="center">
        {pokemonImage ? (
          <img src={pokemonImage} alt={name} className={classes.img}></img>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={"100%"}
            width={"100%"}
          >
            <CircularProgress
              className={classes.circularProgress}
            ></CircularProgress>
          </Box>
        )}
      </Box>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{toFirstCharUppercase(name)}</Typography>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
