import React, { useState, useEffect } from 'react'
import calculateHash from '../Components/utils/calculateHash';
import '../Components/List/List.css'
import DarkMode from '../Components/DarkMode';
import ModalCreators from '../Components/Modals/ModalCreators';

interface MarvelCreator {
  id: number;
  firstName: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: string;
  }
  stories: {
    available: string;
  }
  series: {
    available: string;
  }
  urls: [
    {
      url: string;
    }
  ]
}

export default function Creators() {

  const [creators, setCreators] = useState<MarvelCreator[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredCreators, setFilteredCreators] = useState<MarvelCreator[]>([]);
  const [selectedCreator, setSelectedCreator] = useState<MarvelCreator | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getCreators() {
      const montaUrl = calculateHash();
      const resposta = await fetch(`http://gateway.marvel.com/v1/public/creators?ts=${montaUrl[0]}&apikey=${montaUrl[1]}&hash=${montaUrl[2]}&offset=${(currentPage - 1) * 20}`);
      const respostaJson = await resposta.json();
      const creators = respostaJson.data.results

      // verifica se existe algum duplicado, eu tava com um bug de duplicar as primeiras requisições
      setCreators(prevState => [...prevState, ...creators.filter((creator:any) => !prevState.some(prevCreator => prevCreator.id === creator.id))]);
    }
    getCreators();
  }, [currentPage]);

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

  const handleSearch = async () => {
    if (searchValue !== '') {
      const montaUrl = calculateHash();
      const resposta = await fetch(
        `http://gateway.marvel.com/v1/public/creators?ts=${montaUrl[0]}&apikey=${montaUrl[1]}&hash=${montaUrl[2]}&firstNameStartsWith=${searchValue}`
      );
      const respostaJson = await resposta.json();
      const creators = respostaJson.data.results;

      setFilteredCreators(creators);
    } else {
      setFilteredCreators([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  const creatorList = searchValue !== '' ? filteredCreators : creators;

  return (
    <div>
      <header className='header-container'>
        <h1 className='lista-titulo'>Creators</h1>
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
          {creatorList.length > 0 && creatorList
            .filter((creator: MarvelCreator) =>
              creator.firstName.toLowerCase().includes(searchValue.toLowerCase())
             )
             .map((creator: MarvelCreator) => (
              <li className='item-lista' key={creator.firstName}>
                <img 
                  className='item-imagem' 
                  src={creator.thumbnail?.path + '.' + creator.thumbnail?.extension} 
                  alt={creator.firstName}
                />
                <p>{creator.firstName}</p>
                <button className='aside-button' onClick={() => {
                  setSelectedCreator(creator); // armazena o personagem selecionado no estado
                  setIsOpen(true); // abre o modal
                }}>More details</button>
              </li>
            ))}
        </ul>
      </div>
      <ModalCreators
          open={isOpen}
          onClose={() => setIsOpen(false)}
          firstName={selectedCreator?.firstName}
          src={selectedCreator?.thumbnail?.path + '.' + selectedCreator?.thumbnail.extension}
          comics={selectedCreator?.comics.available}
          series={selectedCreator?.series.available}
          stories={selectedCreator?.stories.available}
          urls={selectedCreator?.urls[0].url}
        />
    </div>
  )
}

