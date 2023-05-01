import  React, {useState, useEffect} from 'react'
import calculateHash from '../Components/utils/calculateHash';
import '../Components/List/List.css'

interface MarvelCreator {
    id: number;
    fullName: string;
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  }

export default function Creators(){

    const [creators, setCreators] = useState<MarvelCreator[]>([])
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      async function getCreators () {
        const montaUrl = calculateHash();
        const resposta = await fetch(`http://gateway.marvel.com/v1/public/creators?ts=${montaUrl[0]}&apikey=${montaUrl[1]}&hash=${montaUrl[2]}&offset=${(currentPage - 1) * 20}`);
        const respostaJson = await resposta.json();
        const characters = respostaJson.data.results
  
        console.log(characters)
        setCreators(prevState => [...prevState, ...characters]);
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

    return (
        <div>
            <h1 className='lista-titulo'>Criadores</h1>
            <div className='lista-container'>
                <ul className='item-container'>
                    {creators.length > 0 && creators.map((creator: MarvelCreator) => (
                        <li className='item-lista'>
                            <img className='item-imagem' src={creator.thumbnail?.path + '.' + creator.thumbnail?.extension} alt={creator.fullName}></img>
                            <p>{creator.fullName}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

