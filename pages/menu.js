
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import Head from 'next/head'


const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Menu = () => {
    const { data, err } = useSWR('/api/get-menu', fetcher)
    const [listItems, setListItems] = useState([]);

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
                                            {each.imgUrl}
                                        </h1>
                                        <h2 className='preco'>
                                            {each.precoFinal}
                                            {each.desconto.length > 0 &&
                                                <span> (Desconto de {each.desconto})</span>
                                            }
                                        </h2>
                                        <p className='pratoDesc'>
                                            {each?.desc ? each.desc : "Sem Descrição"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    )
}

export default Menu