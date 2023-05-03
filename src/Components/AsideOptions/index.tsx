import React from 'react'
import './AsideOptions.css'
import { Link } from 'react-router-dom'


export default function AsideOptions(){

    const chavePublica = (document.getElementById('public-key') as HTMLInputElement)
    const chavePrivada = (document.getElementById('private-key') as HTMLInputElement)

    const salvaKey = () =>{
        if(chavePublica.value && chavePrivada.value !== ''){
            
            localStorage.setItem('pubkey', chavePublica.value)
            localStorage.setItem('privkey', chavePrivada.value)

            alert('Keys stored')
        }
        else {
            alert('Você precisa preencher as duas chaves corretamente para utilizar o site!')
        }
    }

    return(
        <div className='aside-bar'>
            <h2 className='aside-title'>Marvelist API</h2>
            <br/>
            <nav className='aside-nav'>
                <Link to="characters" className='aside-button' id='characters'>Characters</Link>
                <Link to="comics" className='aside-button' id='comics'>Comics</Link>
                <Link to="creators" className='aside-button' id='creators'>Creators</Link>
            </nav>
            <div className='aside-input-box'>
                <label htmlFor="" className='aside-label'>Insert your API keys, collected in Marvel's <a href='https://developer.marvel.com' className='aside-link'>website</a>.</label>
                <input type="text" className='aside-input' placeholder='Insira sua chave pública aqui' id='public-key' required={true}></input>
                <input type="text" className='aside-input' placeholder='Insira sua chave privada aqui' id='private-key' required={true}></input>
                <button type='submit' className='aside-button-submit' onClick={salvaKey}>Submit</button>
            </div>
        </div>
    )
}