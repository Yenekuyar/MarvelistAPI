import React, { useEffect, useState } from 'react';
import './App.css';
import AsideOptions from './Components/AsideOptions';
import List from './Components/List'
import axios from 'axios';
import calculateHash from './Components/utils/utils';

function App() {

  const [characters, setCharacters] = useState([])

  useEffect(() => {
    async function getCharacters () {
      const resposta = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=${montaUrl[0]}&apikey=${montaUrl[1]}&hash=${montaUrl[2]}`);
      const respostaJson = await resposta.json();
      const characters = respostaJson.data.results

      console.log(characters)
      setCharacters(characters);
    }
    getCharacters();
  }, []); 


  const montaUrl = calculateHash();

  return (
    <div className='app'>
      <aside className="app-aside-bar">
        <AsideOptions />
      </aside>
      <List 
        characters={characters}
      />
    </div>
  );
}

export default App;