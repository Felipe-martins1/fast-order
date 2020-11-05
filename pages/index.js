import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const Index = () => {
    return (
        <div id='main'>
            <Head>
                <title>Home</title>
            </Head>
            <div className='letra-main'>
                <h1><span>Peça</span> sua comida</h1>
                <h1><span>Rapidamente</span></h1>
                <h4>Escolha seus produtos no nosso cardápio</h4>
                <h4>de forma rápida e simples</h4>
                <Link href='/menu'><button>Aperte aqui!</button></Link>
            </div >
            <div className='image'>
                <img src='/Draw_Hamburguer.png' alt='Man with hamburguer' />
            </div>
        </div >
    )
}

export default Index