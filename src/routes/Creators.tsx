import  React, {useState, useEffect} from 'react'
import calculateHash from '../Components/utils/calculateHash';
import '../Components/List/List.css'

export default function Creators(){

    const montaUrl = calculateHash();

    const [creators, setCreators] = useState([])

    useEffect(() => {
      async function getCreators () {
        const resposta = await fetch(`http://gateway.marvel.com/v1/public/creators?ts=${montaUrl[0]}&apikey=${montaUrl[1]}&hash=${montaUrl[2]}`);
        const respostaJson = await resposta.json();
        const creators = respostaJson.data.results
  
        setCreators(creators);
      }
      getCreators();
    }, []); 

    return (
        <div>
            <h1 className='lista-titulo'>Criadores</h1>
            <div className='lista-container'>
                <ul className='item-container'>
                    {creators.length > 0 && creators.map((creator: any) => (
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

