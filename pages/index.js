import React from 'react'
import Link from 'next/link'

const Index = () => {
    return (
        <div id='main'>
            <div class='letra-main'>
                <h1><span>Peça</span> sua comida</h1>
                <h1><span>Rapidamente</span></h1>
                <h4>Escolha seus produtos no nosso cardápio</h4>
                <h4>de forma rápida e simples</h4>
                <Link href='/pedido'><button>Aperte aqui!</button></Link>
            </div >
            <div class='image'>
                <img src='/Draw_Hamburguer.png' alt='Man with hamburguer' />
            </div>
        </div >
    )
}

export default Index