import React from 'react'
import Link from 'next/link'


const Header = () => {
    return (
        <div>
            <div id='header'>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/menu">
                    <a>Menu</a>
                </Link>
                <Link href="/contato">
                    <a>Contato</a>
                </Link>
            </div>
        </div>
    )
}

export default Header