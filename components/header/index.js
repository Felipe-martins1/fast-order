import React from 'react'
import Link from 'next/link'


const Header = () => {
    return (
        <div>
            <div id='header'>
                <Link href="/contato">
                    <a>Contato</a>
                </Link>
                <Link href="/pedido">
                    <a>Delivery</a>
                </Link>
                <Link href="/sobre">
                    <a>Sobre</a>
                </Link>
            </div>
        </div>
    )
}

export default Header