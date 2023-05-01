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

            chavePublica.value = ''
            chavePrivada.value = ''
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
                <Link to="characters" className='aside-button' id='characters'>Personagens</Link>
                <Link to="comics" className='aside-button' id='comics'>Quadrinhos</Link>
                <Link to="creators" className='aside-button' id='creators'>Criadores</Link>
            </nav>
            <div className='aside-input-box'>
                <label htmlFor="" className='aside-label'>Insira suas chaves de API, coletadas diretamente do <a href='https://developer.marvel.com' className='aside-link'>site</a> da Marvel.</label>
                <input type="text" className='aside-input' placeholder='Insira sua chave pública aqui' id='public-key' required={true}></input>
                <input type="text" className='aside-input' placeholder='Insira sua chave privada aqui' id='private-key' required={true}></input>
                <button type='submit' className='aside-button-submit' onClick={salvaKey}>Enviar</button>
            </div>
        </div>
    )
}