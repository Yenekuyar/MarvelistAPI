import  React, {useState, useEffect} from 'react'
import calculateHash from '../Components/utils/calculateHash';
import '../Components/List/List.css'

export default function Character(){

    const montaUrl = calculateHash();

    const [characters, setCharacters] = useState([])

    useEffect(() => {
      async function getCharacters () {
        const resposta = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=${montaUrl[0]}&apikey=${montaUrl[1]}&hash=${montaUrl[2]}`);
        const respostaJson = await resposta.json();
        const characters = respostaJson.data.results
  
        setCharacters(characters);
      }
      getCharacters();
    }, []); 

    return (
        <div>
            <h1 className='lista-titulo'>Personagens</h1>
            <div className='lista-container'>
                <ul className='item-container'>
                    {characters.length > 0 && characters.map((character: any) => (
                        <li className='item-lista'>
                            <img className='item-imagem' src={character.thumbnail?.path + '.' + character.thumbnail?.extension} alt={character.name}></img>
                            <p>{character.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

