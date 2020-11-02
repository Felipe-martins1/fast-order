import React from 'react'

const Pedido = () => {
    return (
        <React.Fragment>
            <h1>Seu pedido:</h1>
            <div id='form'>
                <form>
                    <div class='cadastro'>
                        <label for='name'>Seu nome</label><br />
                        <input type='text' id='name' name='name'></input><br />
                    </div>

                    <div class='cadastro'>
                        <label for='cpf'>Seu nome</label><br />
                        <input type='number' id='cpf' name='cpf'></input><br />
                    </div>

                    <div class='cadastro'>
                        <label for='endereco'>Seu nome</label><br />
                        <input type='text' id='endereco' name='endereco'></input><br />
                    </div>

                    <div class='cadastro'>
                        <label for='obs'>Seu nome</label><br />
                        <input type='text' id='obs' name='obs'></input><br />
                    </div>


                    <div class='cardapio'>
                        <label for="comidas">Comidas</label>
                        <select name="comidas" id="comidas">
                            <option value="1">Macarrão</option>
                            <option value="2">Arroz</option>
                            <option value="3">Espeto</option>
                            <option value="4">Hamburguer</option>
                        </select>
                    </div>

                    <div class='cardapio'>
                        <label for="bebidas">Bebidas</label>
                        <select name="bebidas" id="bebidas">
                            <option value="1">Agua</option>
                            <option value="2">Coca</option>
                            <option value="3">Sprite</option>
                            <option value="4">Fanta</option>
                        </select>
                    </div>

                    <button type='submit'>Finalizar Pedido</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Pedido