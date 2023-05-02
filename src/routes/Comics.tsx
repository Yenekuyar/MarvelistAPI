import React, { useState, useEffect } from 'react'
import calculateHash from '../Components/utils/calculateHash';
import '../Components/List/List.css'
import DarkMode from '../Components/DarkMode';
import ModalComics from '../Components/ModalComics';

interface MarvelComic {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export default function Creators() {

  const [comics, setComics] = useState<MarvelComic[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredComics, setFilteredComics] = useState<MarvelComic[]>([]);
  const [selectedComic, setSelectedComic] = useState<MarvelComic | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getComics() {
      const montaUrl = calculateHash();
      const resposta = await fetch(`http://gateway.marvel.com/v1/public/comics?ts=${montaUrl[0]}&apikey=${montaUrl[1]}&hash=${montaUrl[2]}&offset=${(currentPage - 1) * 20}`);
      const respostaJson = await resposta.json();
      const comics = respostaJson.data.results;

      console.log(comics);
      // verifica se existe algum duplicado, eu tava com um bug de duplicar as primeiras requisições
      setComics(prevState => [...prevState, ...comics.filter((comic:any) => !prevState.some(prevComic => prevComic.id === comic.id))]);
    }
    getComics();
  }, [currentPage]);

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    if (scrollY + windowHeight >= documentHeight) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleSearch = async () => {
    if (searchValue !== '') {
      const montaUrl = calculateHash();
      const resposta = await fetch(
        `http://gateway.marvel.com/v1/public/comics?ts=${montaUrl[0]}&apikey=${montaUrl[1]}&hash=${montaUrl[2]}&titleStartsWith=${searchValue}`
      );
      const respostaJson = await resposta.json();
      const comics = respostaJson.data.results;

      setFilteredComics(comics);
    } else {
      setFilteredComics([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  const comicList = searchValue !== '' ? filteredComics : comics;

  return (
    <div>
      <header className='header-container'>
        <h1 className='lista-titulo'>Comics</h1>
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
          {comicList.length > 0 && comicList
            .filter((comic: MarvelComic) =>
              comic.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((comic: MarvelComic) => (
              <li className='item-lista' key={comic.title}>
                <img
                  className='item-imagem'
                  src={comic.thumbnail?.path + '.' + comic.thumbnail?.extension}
                  alt={comic.title}
                />
                <p>{comic.title}</p>
                <button className='aside-button' onClick={() => {
                  setSelectedComic(comic); // armazena o personagem selecionado no estado
                  setIsOpen(true); // abre o modal
                }}>More details</button>
              </li>
            ))}
        </ul>
      </div>
      {selectedComic && ( // renderiza o modal apenas se houver um personagem selecionado
        <ModalComics
          open={isOpen}
          onClose={() => setIsOpen(false)}
          name={selectedComic.title}
          description={selectedComic.description}
          comicQuantities={selectedComic}
          src={selectedComic.thumbnail?.path + '.' + selectedComic.thumbnail?.extension}
        >
        </ModalComics>
      )}
    </div>
  )
}

