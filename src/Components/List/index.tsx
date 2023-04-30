import './List.css'

export default function List(){
    return (
        <div className='lista-container'>
            <ul className='item-container'>
                <li className='item-lista'>
                    <img src="http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c0042121d790.jpg" alt="" className='item-imagem'/>
                    <a href='' className='item-link'>Nome do Personagem</a>
                </li>
            </ul>
        </div>
    )
}