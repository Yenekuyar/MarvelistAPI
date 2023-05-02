import React, { useState, useEffect } from 'react'
import calculateHash from '../Components/utils/calculateHash';
import '../Components/List/List.css'
import axios from 'axios';
import DarkMode from '../Components/DarkMode';
import ModalCharacter from '../Components/ModalCharacter';
import '../Components/ModalCharacter/Modal.css'

interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: string;
  }
}

export default function Character() {

  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredCharacters, setFilteredCharacters] = useState<MarvelCharacter[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<MarvelCharacter | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  

  useEffect(() => {
    async function getCharacters() {
      const montaUrl = calculateHash();
      const resposta = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=${montaUrl[0]}&apikey=${montaUrl[1]}&hash=${montaUrl[2]}&offset=${(currentPage - 1) * 20}`);
      const respostaJson = await resposta.json();
      const characters = respostaJson.data.results;

      console.log(characters);
      // verifica se existe algum duplicado, eu tava com um bug de duplicar as primeiras requisições
      setCharacters(prevState => [...prevState, ...characters.filter((character:any) => !prevState.some(prevCharacter => prevCharacter.id === character.id))]);
    }
    getCharacters();
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    if (scrollY + windowHeight >= documentHeight) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };

  const handleSearch = async () => {
    if (searchValue !== '') {
      const montaUrl = calculateHash();
      const resposta = await fetch(
        `http://gateway.marvel.com/v1/public/characters?ts=${montaUrl[0]}&apikey=${montaUrl[1]}&hash=${montaUrl[2]}&nameStartsWith=${searchValue}`
      );
      const respostaJson = await resposta.json();
      const characters = respostaJson.data.results;

      setFilteredCharacters(characters);
    } else {
      setFilteredCharacters([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);
  


  // constante pra verificar se existe um valor de busca para passar ou o parâmetro de personagens filtrados ou a lista inteira (com o spread)
  const characterList = searchValue !== '' ? filteredCharacters : characters;

  return (
<div>
      <header className='header-container'>
        <h1 className='lista-titulo'>Characters</h1>
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
          {characterList.length > 0 && characterList
            .filter((character: MarvelCharacter) =>
              character.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((character: MarvelCharacter) => ( //renderiza individualmente os personagens
              <li className='item-lista' key={character.name}>
                <img
                  className='item-imagem'
                  src={character.thumbnail?.path + '.' + character.thumbnail?.extension}
                  alt={character.name}
                />
                <p>{character.name}</p>
                <button className='aside-button' onClick={() => {
                  setSelectedCharacter(character); // armazena o personagem selecionado no estado
                  setIsOpen(true); // abre o modal
                }}>More details</button>
              </li>
            ))}
        </ul>
      </div>
      {selectedCharacter && ( // renderiza o modal apenas se houver um personagem selecionado
        <ModalCharacter
          open={isOpen}
          onClose={() => setIsOpen(false)}
          name={selectedCharacter.name}
          description={selectedCharacter.description}
          comicQuantities={selectedCharacter.comics.available}
          src={selectedCharacter.thumbnail?.path + '.' + selectedCharacter.thumbnail?.extension}
        >
        </ModalCharacter>
      )}
    </div>
  )
}

