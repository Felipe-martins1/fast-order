import React from 'react'
import Header from '../components/header'

import '../css/header.css'
import '../css/index.css'
import '../css/menu.css'
import '../css/cadastro.css'
import '../css/contato.css'
import '../css/carrinho.css'

const MyApp = ({ Component, pageProps }) => {
    return (
        <div>
            <Header />
            <div id='content'>
                <Component {...pageProps} />
            </div>
        </div>
    )
}

export default MyApp