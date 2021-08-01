import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  Button,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import axios from "axios";
import { useHistory } from "react-router";
import { toFirstCharUppercase, hgToKg, dcToFt } from "../utils";

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: 300,
    minHeight: 300,
    marginTop: "10rem",
  },

  pokemonStatsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },

  Button: {
    margin: 5,
  },

  Typography: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.5,
  },

  CheckCircleOutlineIcon: {
    color: "#3f51b5",
  },

  LinearProgress: {
    height: 20,
    margin: 3,
    marginBottom: 4,
  },

  divContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  card: {
    maxWidth: "100vw",
    paddingBottom: 20,
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const PokemonStats = (props) => {
  const history = useHistory();

  const classes = useStyles();
  const { pokemonId } = props.match.params;
  const [pokemonData, setPokemonData] = useState({});
  const [pokemonImage, setPokemonImage] = useState("");
  const [pokemonDescription, setPokemonDescription] = useState("");

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`).then((res) => {
      setPokemonData(res.data);
      setPokemonImage(res.data.sprites.other.dream_world.front_default);
    });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      .then((res) => {
        res.data.flavor_text_entries.forEach((flavor) => {
          if (flavor.language.name === "en") {
            setPokemonDescription(flavor.flavor_text);
          }
        });
      });
  }, [pokemonId]);

  const { name, base_experience, height, weight, types, abilities, stats } =
    pokemonData;

  let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

  if (stats)
    stats.forEach((element) => {
      switch (element.stat.name) {
        case "hp":
          hp = element["base_stat"];
          break;
        case "attack":
          attack = element["base_stat"];
          break;
        case "defense":
          defense = element["base_stat"];
          break;
        case "speed":
          speed = element["base_stat"];
          break;
        case "special-attack":
          specialAttack = element["base_stat"];
          break;
        case "special-defense":
          specialDefense = element["base_stat"];
          break;
        default:
          break;
      }
    });

  return (
    <>
      <Grid
        container
        justify="center"
        className={classes.pokemonStatsContainer}
      >
        <Grid xs={7} spacing={1}>
          <Card variant="outlined" className={classes.card}>
            <Grid container>
              <Grid item xs={5}>
                {pokemonImage ? (
                  <Box textAlign="center">
                    <img
                      src={pokemonImage}
                      alt={name}
                      className={classes.img}
                    ></img>
                  </Box>
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
              </Grid>
              <Grid item xs={7}>
                <Typography>
                  <h1>{toFirstCharUppercase(name)}</h1>
                </Typography>
                <Typography className={classes.Typography}>
                  <b>Description</b>
                  <br></br> {pokemonDescription}
                </Typography>
                <Typography className={classes.Typography}>
                  <b>Base Experience</b> {base_experience}
                </Typography>
                <Typography className={classes.Typography}>
                  <b>Height</b> {dcToFt(height)} feet
                </Typography>
                <Typography className={classes.Typography}>
                  <b>Weight</b> {hgToKg(weight)} kg
                </Typography>
                <br></br>
                <Typography className={classes.Typography}>
                  <b>Type</b>
                </Typography>
                {types &&
                  types.map((element) => {
                    const name = element.type.name;
                    return (
                      <Typography key={name} className={classes.Typography}>
                        <div className={classes.divContainer}>
                          <CheckCircleOutlineIcon
                            className={classes.CheckCircleOutlineIcon}
                          />
                          {toFirstCharUppercase(name)}
                        </div>
                      </Typography>
                    );
                  })}
                <br></br>
                <Typography className={classes.Typography}>
                  <b>Abilities</b>
                </Typography>
                {abilities &&
                  abilities.map((element) => {
                    const name = element.ability.name;
                    return (
                      <Typography key={name} className={classes.Typography}>
                        <div className={classes.divContainer}>
                          <CheckCircleOutlineIcon
                            className={classes.CheckCircleOutlineIcon}
                          />
                          {toFirstCharUppercase(name)}
                        </div>
                      </Typography>
                    );
                  })}

                <br></br>
                <Typography className={classes.Typography}>
                  <b>Stats</b>
                </Typography>
                <Grid container>
                  <Grid item xs={3}>
                    <Typography className={classes.Typography}>
                      <div className={classes.divContainer}>
                        <CheckCircleOutlineIcon
                          className={classes.CheckCircleOutlineIcon}
                        />
                        HP
                      </div>
                    </Typography>
                    <Typography className={classes.Typography}>
                      <div className={classes.divContainer}>
                        <CheckCircleOutlineIcon
                          className={classes.CheckCircleOutlineIcon}
                        />
                        Attack
                      </div>
                    </Typography>
                    <Typography className={classes.Typography}>
                      <div className={classes.divContainer}>
                        <CheckCircleOutlineIcon
                          className={classes.CheckCircleOutlineIcon}
                        />
                        Defense
                      </div>
                    </Typography>
                    <Typography className={classes.Typography}>
                      <div className={classes.divContainer}>
                        <CheckCircleOutlineIcon
                          className={classes.CheckCircleOutlineIcon}
                        />
                        Speed
                      </div>
                    </Typography>
                    <Typography className={classes.Typography}>
                      <div className={classes.divContainer}>
                        <CheckCircleOutlineIcon
                          className={classes.CheckCircleOutlineIcon}
                        />
                        Special Attack
                      </div>
                    </Typography>
                    <Typography className={classes.Typography}>
                      <div className={classes.divContainer}>
                        <CheckCircleOutlineIcon
                          className={classes.CheckCircleOutlineIcon}
                        />
                        Special Defense
                      </div>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <LinearProgressWithLabel
                      variant="determinate"
                      value={hp}
                      className={classes.LinearProgress}
                    />
                    <LinearProgressWithLabel
                      variant="determinate"
                      value={attack}
                      className={classes.LinearProgress}
                    />
                    <LinearProgressWithLabel
                      variant="determinate"
                      value={defense}
                      className={classes.LinearProgress}
                    />
                    <LinearProgressWithLabel
                      variant="determinate"
                      value={speed}
                      className={classes.LinearProgress}
                    />
                    <LinearProgressWithLabel
                      variant="determinate"
                      value={specialAttack}
                      className={classes.LinearProgress}
                    />
                    <LinearProgressWithLabel
                      variant="determinate"
                      value={specialDefense}
                      className={classes.LinearProgress}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <br></br>
      <Box textAlign="center">
        <Button
          variant="contained"
          size="large"
          className={classes.Button}
          onClick={() => history.push(`/`)}
        >
          Go Back
        </Button>
      </Box>
    </>
  );
};

export default PokemonStats;
