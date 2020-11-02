import React from 'react'
import Header from '../components/header'

import '../css/header.css'
import '../css/index.css'

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