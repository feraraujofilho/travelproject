import React from 'react';
import PokemonSearch from "./components/PokemonSearch"
import Navbar from "./components/navbar/Navbar"
import Search from "./components/search/Search"
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar/>
      <Search />
      {/* <PokemonSearch name="John Doe" numberOfPokemons={5} /> */}
    </div>
  );
}

export default App;
