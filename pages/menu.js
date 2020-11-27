
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'


const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Menu = () => {

    const { data, err } = useSWR('/api/get-menu', fetcher)
    const [listItems, setListItems] = useState([]);
    const [cartItens, setCartItens] = useState([]);
    const [changeCart, setChangeCart] = useState(0);
    const [showCart, setShowCart] = useState(false);

    const getTotalCart = () => {
        let itensSoma = JSON.parse(localStorage.getItem('products'))
        let somaArr = []
        if (itensSoma !== null) {
            itensSoma.map((each) => {
                somaArr.push(each.qtd)
            })
            const somar = (acumulado, x) => acumulado + x;
            const total = somaArr.reduce(somar);
            setChangeCart(total)
            getCart()
        }
    }

    const clearCart = () => {
        localStorage.clear()
        setChangeCart(0)
        setCartItens([])
    }

    const addCart = (product) => {
        let status = localStorage.getItem('products')
        if (status === null) {
            let itens = []
            itens.push(product)
            localStorage.setItem('products', JSON.stringify(itens))
        } else {
            let itens = JSON.parse(localStorage.getItem('products'))
            const productAddedIndex = itens.findIndex(value => {
                return value.item === product.item
            })
            if (productAddedIndex !== -1) {
                itens[productAddedIndex].qtd = itens[productAddedIndex].qtd + product.qtd
                localStorage.setItem('products', JSON.stringify(itens))
            } else {
                itens.push(product)
                localStorage.setItem('products', JSON.stringify(itens))
            }
        }
        getTotalCart()
    }

    const getCart = () => {
        if (localStorage.getItem('products') !== null) {
            let cart = JSON.parse(localStorage.getItem('products'))
            setCartItens(cart)
        }
    }

    const showCartItens = () => {
        if (cartItens.length > 0) {
            if (showCart === true) {
                setShowCart(false)
            } else {
                setShowCart(true)
            }
        }

    }

    useEffect(() => {
        if (data?.length > 0) {
            const getItems = async () => {
                const getUrlInsta = await data.map(async (each) => {
                    let newItem = { ...each };
                    newItem = {
                        ...each,
                        imgUrl: each.Foto,
                    };
                    return newItem;
                });
                const result = await Promise.all(getUrlInsta);
                setListItems(result);
            };
            getItems();
            getTotalCart();
        }
    }, [data]);
    return (
        <div id="wrapper">
            <Head>
                <title>Menu</title>
            </Head>
            <section>
                <div className='pratos'>
                    {listItems.length > 0 &&
                        listItems.map((each) => (
                            <div className='prato'>
                                <div>
                                    <img
                                        className='image'
                                        src={each.foto}
                                        alt="blog"
                                    />
                                    <div className='details'>
                                        <h1 className='name'>
                                            {each.item}
                                        </h1>
                                        <h2 className='preco'>
                                            R${each.precoFinal}
                                            {each.desconto.length > 1 &&
                                                <span> (Desconto de {each.desconto})</span>
                                            }
                                        </h2>

                                        <p className='pratoDesc'>
                                            {each?.desc ? each.desc : "Sem Descrição"}
                                        </p>
                                    </div>
                                    <button onClick={() => { addCart(each) }}>Adicionar ao carrinho</button>
                                </div>
                            </div>
                        ))}
                </div>
                {listItems.length > 0 &&
                    <div id='cart'>
                        <div className='cartNumber'>
                            <h1>{changeCart}</h1>
                            <button onClick={showCartItens}><img src='/cart.png'></img></button>
                        </div>
                        {showCart === true && cartItens.length > 0 &&
                            <div className='cart-itens'>
                                <h1>Seu pedido</h1>
                                {cartItens.length > 0 &&
                                    cartItens.map((each) => (
                                        <div className='item'>
                                            <div>
                                                <hr></hr>
                                                <div className='details'>
                                                    <h1 className='name'>
                                                        {each.item}
                                                    </h1>
                                                    <h2 className='preco'>
                                                        {each.precoFinal}
                                                        <span className='qtd'>qtd:{each.qtd}</span>
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                <Link href='/carrinho'><button className='finalizar-pedido'>Finalizar Pedido</button></Link>
                            </div>
                        }
                        <div className='clearCart'>
                            <button onClick={clearCart}>Limpar Carrinho</button>
                        </div>
                        {showCart === true &&
                            <div>
                                <button className='downArrow' onClick={showCartItens}><img src='/arrow.png'></img></button>


                            </div>
                        }
                        {showCart === false &&
                            <div>
                                <button className='upArrow' onClick={showCartItens}><img src='/arrow.png'></img></button>
                                <h4 onClick={showCartItens}>Mostrar carrinho</h4>
                            </div>
                        }

                    </div>
                }
            </section>
        </div>
    )
}

export default Menu