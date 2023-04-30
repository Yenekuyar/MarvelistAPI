import React from 'react'
import './AsideOptions.css'
import calculaHash from '../utils/utils'

export default function AsideOptions(){

    const chavePublica = (document.getElementById('public-key') as HTMLInputElement)
    const chavePrivada = (document.getElementById('private-key') as HTMLInputElement)
    const ts = Date.now().toString();

    

    const salvaKey = () =>{
        if(chavePublica.value && chavePrivada.value !== ''){
            
            localStorage.setItem('pubkey', chavePublica.value)
            localStorage.setItem('privkey', chavePrivada.value)
            
            calculaHash()

            chavePublica.value = ''
            chavePrivada.value = ''
        }
        else {
            alert('Você precisa preencher as duas chaves corretamente para utilizar o site!')
        }
    }

    return(
        <div className='aside-bar'>
            <h2 className='aside-title'>MarvelistAPI</h2>
            <hr />
            <button className='aside-button'>Personagens</button>
            <button className='aside-button'>Quadrinhos</button>
            <button className='aside-button'>Criadores</button>
            <div className='aside-input-box'>
                <label htmlFor="" className='aside-title'>Insira suas chaves de API, coletadas diretamente do <a href='https://developer.marvel.com'>site</a> da Marvel.</label>
                <input type="text" className='aside-input' placeholder='Insira sua chave pública aqui' id='public-key' required={true}></input>
                <input type="text" className='aside-input' placeholder='Insira sua chave privada aqui' id='private-key' required={true}></input>
                <button type='submit' className='aside-button-submit' onClick={salvaKey}>Enviar</button>
            </div>
        </div>
    )
}