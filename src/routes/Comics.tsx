import  React, {useState, useEffect} from 'react'
import calculateHash from '../Components/utils/calculateHash';
import '../Components/List/List.css'

interface MarvelComic {
    id: number;
    title: string;
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  }

export default function Creators(){

    const [comics, setComics] = useState<MarvelComic[]>([])
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      async function getComics () {
        const montaUrl = calculateHash();
        const resposta = await fetch(`http://gateway.marvel.com/v1/public/comics?ts=${montaUrl[0]}&apikey=${montaUrl[1]}&hash=${montaUrl[2]}&offset=${(currentPage - 1) * 20}`);
        const respostaJson = await resposta.json();
        const comics = respostaJson.data.results

        setComics(prevState => [...prevState, ...comics]);
      }
      getComics();
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

    return (
        <div>
            <h1 className='lista-titulo'>Quadrinhos</h1>
            <div className='lista-container'>
                <ul className='item-container'>
                    {comics.length > 0 && comics.map((comic: MarvelComic) => (
                        <li className='item-lista'>
                            <img className='item-imagem' src={comic.thumbnail?.path + '.' + comic.thumbnail?.extension} alt={comic.title}></img>
                            <p>{comic.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

