import  React, {useState, useEffect} from 'react'
import calculateHash from '../Components/utils/calculateHash';
import '../Components/List/List.css'

export default function Creators(){

    const montaUrl = calculateHash();

    const [comics, setComics] = useState([])

    useEffect(() => {
      async function getComics () {
        const resposta = await fetch(`http://gateway.marvel.com/v1/public/comics?ts=${montaUrl[0]}&apikey=${montaUrl[1]}&hash=${montaUrl[2]}`);
        const respostaJson = await resposta.json();
        const comics = respostaJson.data.results
  
        setComics(comics);
      }
      getComics();
    }, []); 

    return (
        <div>
            <h1 className='lista-titulo'>Quadrinhos</h1>
            <div className='lista-container'>
                <ul className='item-container'>
                    {comics.length > 0 && comics.map((comic: any) => (
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

