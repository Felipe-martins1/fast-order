import React, { useState, useEffect } from 'react'
import Link from 'next/link'


const Carrinho = () => {
    const [orderItens, setOrderItens] = useState([])
    const [indexUseEffect, setIndexUseEffect] = useState()

    const [totalValue, setTotalValue] = useState(0)
    const [pedidoStr, setPedidoStr] = useState([])

    const [retorno, setRetorno] = useState({});
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({
        Nome: "",
        Endereco: "",
        FormaPagamento: "",
        Observacao: "",
    });

    //Form-------------------------------
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((old) => ({
            ...old,
            [name]: value,
        }));
    };

    const save = async () => {
        try {
            form["Pedido"] = pedidoStr
            form["ValorPedido"] = totalValue
            const response = await fetch("/api/new-pedido", {
                method: "POST",
                body: JSON.stringify(form),
            });

            const data = await response.json();
            console.log(data)
            setSuccess(true);
            setRetorno(data);
            setForm({
                Nome: "",
                Endereco: "",
                FormaPagamento: "",
                Observacao: "",
            })
        } catch (err) {
            console.log(err)
        }
    }
    //--------------------------------------------------------------


    //getFullOrder 
    const getFullOrder = () => {
        if (orderItens.length > 0) {
            let fullStr = []
            orderItens.map((each) => {
                fullStr.push(each.qtd + " " + each.item + ", ")
            })
            const somar = (acumulado, x) => acumulado + x;
            const total = fullStr.reduce(somar);
            setPedidoStr(total)
        }
    }
    //Pegar o pedido
    const getOrder = () => {
        if (localStorage.getItem('products') === null) {
            return
        } else {
            let cart = JSON.parse(localStorage.getItem('products'))
            setOrderItens(cart)
            getFullOrder()
        }
    }

    //Adicionar +1 na quantidade
    const Addqtd = (itemName) => {
        let toBeAdd = orderItens.findIndex(res => {
            return res.item === itemName
        })
        orderItens[toBeAdd].qtd = orderItens[toBeAdd].qtd + 1
        localStorage.setItem('products', JSON.stringify(orderItens))
        setIndexUseEffect(itemName)
    }


    //Subtrair -1 na quantidade
    const Subqtd = (itemName) => {
        let toBeAdd = orderItens.findIndex(res => {
            return res.item === itemName
        })
        orderItens[toBeAdd].qtd = orderItens[toBeAdd].qtd - 1
        localStorage.setItem('products', JSON.stringify(orderItens))
        setIndexUseEffect(itemName)
        if (orderItens[toBeAdd].qtd <= 0) {
            orderItens.splice(toBeAdd, 1)
            localStorage.setItem('products', JSON.stringify(orderItens))
            clearIfNoItens()
        }
    }

    //limpar o localstorage se nao tiver itens
    const clearIfNoItens = () => {
        if (orderItens.length === 0) {
            localStorage.clear()
        }
    }


    //deletar itens
    const deleteItem = (itemName) => {
        let TobeDeleted = orderItens.findIndex(res => {
            return res.item === itemName
        })
        orderItens.splice(TobeDeleted, 1)
        localStorage.setItem('products', JSON.stringify(orderItens))
        clearIfNoItens()
        setIndexUseEffect(itemName)
    }


    //pegar valor total
    const getTotalValue = () => {
        if (orderItens.length > 0) {
            let somaArr = []
            orderItens.map((each) => {
                somaArr.push(each.qtd * parseFloat(each.precoFinal.replace(",", ".")))
            })
            const somar = (acumulado, x) => acumulado + x;
            const total = somaArr.reduce(somar);
            setTotalValue(total.toFixed(2))
        }
    }

    const initTotalValue = () => {
        if (totalValue === 0) {
            getTotalValue()
        }
    }

    initTotalValue()

    useEffect(() => {
        getOrder()
        getTotalValue()
        setIndexUseEffect()
    }, [indexUseEffect])

    return (
        <div id='carrinho'>
            {orderItens.length == 0 &&
                <h1 className='empty'>Seu carrinho está Vazio</h1>
            }

            <div id='order-itens'>
                {retorno === true &&
                    <h1>Sucesso</h1>
                }
                <div className='voltar'>
                    <Link href='/menu'><img src='arrow.png'></img></Link>
                    <Link href='/menu'><h1>Voltar ao menu</h1></Link>
                </div>
                {orderItens.length > 0 &&
                    orderItens.map((each) => (
                        <div className='item'>
                            <div className='delete'>
                                <button onClick={() => { deleteItem(each.item) }}><h1>X</h1></button>
                            </div>
                            <div>
                                <img src={each.foto}></img>
                            </div>
                            <div className='details'>
                                <h1 className='name'>
                                    {each.item}
                                </h1>
                                <h2 className='preco'>
                                    {each.precoFinal}
                                </h2>
                                <h2>Quantidade:</h2>
                                <button className='subtração' onClick={() => { Subqtd(each.item) }}><span>-</span></button>
                                <span className='qtd'>{each.qtd}</span>
                                <button className='adição' onClick={() => { Addqtd(each.item) }}><span>+</span></button>
                            </div>
                        </div>
                    ))}


                <div className='payment'>
                    {orderItens.length > 0 &&
                        <React.Fragment>
                            <div className='form'>
                                <h4><label for='Nome'>Seu nome</label></h4>
                                <input
                                    placeholder="Insira seu Nome completo"
                                    type="text"
                                    name="Nome"
                                    onChange={onChange}
                                    value={form.Nome}
                                    required
                                />

                                <h4><label for='Endereco'>Seu endereço: Ex: Bairro/Rua/Número</label></h4>
                                <input
                                    placeholder="Insira seu Endereço Completo"
                                    type="text"
                                    name="Endereco"
                                    onChange={onChange}
                                    value={form.Endereco}
                                    required
                                />

                                <h4><label for='FormaPagamento'>Selecione uma Forma de pagamento</label></h4>
                                <div className='radio'>
                                    <div>
                                        <span>Dinheiro</span>
                                        <input
                                            type="radio"
                                            name="FormaPagamento"
                                            onClick={onChange}
                                            value="Dinheiro"
                                        />
                                    </div>

                                    <div>
                                        <span>Cartão</span>
                                        <input
                                            type="radio"
                                            name="FormaPagamento"
                                            onClick={onChange}
                                            value="Cartão de crédito"
                                        />
                                    </div>
                                </div>

                                <h4><label for='Observacao'>Observações</label></h4>
                                <input
                                    placeholder="Se necessário, insira alguma observação"
                                    type="text"
                                    name="Observacao"
                                    onChange={onChange}
                                    value={form.Observacao}
                                />
                                <div className='totalValue'>
                                    <h1>Valor total: R${totalValue}</h1>
                                </div>
                                <hr></hr>
                                <button onClick={save}>Fazer Pedido</button>
                            </div>


                        </React.Fragment>
                    }
                </div>
            </div>
        </div>
    )
}

export default Carrinho