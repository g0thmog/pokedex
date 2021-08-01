import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pokedex from "./components/Pokedex";
import PokemonStats from "./components/PokemonStats";
import "./App.css";

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Pokedex} />
        <Route exact path="/pokemon/:pokemonId" component={PokemonStats} />
      </Switch>
    </Router>
  );
};

function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
