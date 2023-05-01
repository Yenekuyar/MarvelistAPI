import React, { useState, useEffect } from 'react'
import calculateHash from '../Components/utils/calculateHash';
import '../Components/List/List.css'
import axios from 'axios';
import DarkMode from '../Components/DarkMode';

interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export default function Character() {

  const [characters, setCharacters] = useState<MarvelCharacter[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    async function getCharacters() {
      const montaUrl = calculateHash();
      let url = `http://gateway.marvel.com/v1/public/characters?ts=${montaUrl[0]}&apikey=${montaUrl[1]}&hash=${montaUrl[2]}&offset=${(currentPage - 1) * 20}`
      if (searchValue) {
        setCharacters([])
        url += `&nameStartsWith=${searchValue}`;
      }
      const resposta = await fetch(url);
      const respostaJson = await resposta.json();
      const characters = respostaJson.data.results

      console.log(characters)
      setCharacters(prevState => [...prevState, ...characters]);
      //jetka
    }
    getCharacters();
  }, [currentPage, searchValue]);

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    if (scrollY + windowHeight >= documentHeight) {
      setCurrentPage(prevState => prevState + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <header className='header-container'>
        <h1 className='lista-titulo'>Personagens</h1>
        <input
          type="text"
          placeholder='Digite o personagem que deseja buscar...'
          className='search-bar'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <DarkMode />
      </header>
      <div className='lista-container'>
        <ul className='item-container'>
          {characters.length > 0 && characters
            .filter((character: MarvelCharacter) =>
              character.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((character: MarvelCharacter) => (
              <li className='item-lista' key={character.name}>
                <img 
                  className='item-imagem' 
                  src={character.thumbnail?.path + '.' + character.thumbnail?.extension} 
                  alt={character.name}
                />
                <p>{character.name}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

