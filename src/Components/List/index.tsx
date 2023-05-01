import './List.css'

export default function List({characters}:any){
    return (
        <div className='lista-container'>
            <ul className='item-container'>
                {characters.map((character: any) => (
                    <li className='item-lista'>
                        <img className='item-imagem' src={character.thumbnail?.path + '.' + character.thumbnail?.extension} alt={character.name}></img>
                        <p>{character.name}</p>
                    </li>
                ))}
                {console.log(characters)}
            </ul>
        </div>
    )
}
