import React, { useState } from "react";
import axios from "axios";

const Cadastro = () => {
    const [form, setForm] = useState({
        Nome: "",
        Preco: null,
        instaFoto: "",
        desconto: null,
        descricao: "",
        senha: ""
    });
    const [success, setSuccess] = useState(false);
    const [retorno, setRetorno] = useState({});

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((old) => ({
            ...old,
            [name]: value,
        }));
    };

    const save = async () => {
        try {
            let imgUrlFull = null;
            try {
                imgUrlFull = await axios.get(form.instaFoto + "?__a=1");
                if (imgUrlFull.data) {
                    imgUrlFull = imgUrlFull.data.graphql.shortcode_media.display_url;
                }
            } catch (error) { }

            form["Foto"] = imgUrlFull;
            const response = await fetch("/api/new-prato", {
                method: "POST",
                body: JSON.stringify(form),
            });
            const data = await response.json();
            setSuccess(true);
            setRetorno(data);
        } catch (error) { }
    };

    return (
        <React.Fragment>
            <div id='initial-form'>
                <div className='login'>
                    <div className='title'>
                        <h1> Cadastrar Novo Prato</h1>
                        {success && (
                            <div className='success'>
                                <p>Verifique se o prato foi inserido no menu!</p>
                                <p>Se o prato não estiver no menu, verifique sua senha!</p>
                            </div>
                        )}
                    </div>
                    <div className='senha'>
                        <h4><label for='senha'>Senha</label></h4>
                        <input
                            placeholder="Insira sua senha"
                            type="password"
                            name="senha"
                            onChange={onChange}
                            value={form.senha}
                        />
                    </div>
                </div>
            </div>

            <div id='menu-form'>

                <div className='cadastro'>
                    <div className='name'>
                        <h4><label for='Nome'>Nome do prato</label></h4>
                        <input
                            placeholder="Nome do Prato"
                            type="text"
                            name="Nome"
                            onChange={onChange}
                            value={form.Nome}
                        />
                    </div>
                    <div className='price'>
                        <h4><label for='Preco'>Preço</label></h4>
                        <input placeholder="Preço"
                            type="number"
                            name="Preco"
                            onChange={onChange}
                            value={form.Preco}
                        />
                    </div>
                    <div className='desconto'>
                        <h4><label for='desconto'>Desconto</label></h4>
                        <input placeholder="Desconto"
                            type="number"
                            name="desconto"
                            onChange={onChange}
                            value={form.desconto}
                        />
                    </div>
                    <div className='foto'>
                        <h4><label for='instaFoto'>Link da foto</label></h4>
                        <input
                            placeholder="Foto do Instagram"
                            type="text"
                            name="instaFoto"
                            onChange={onChange}
                            value={form.instaFoto}
                        />
                    </div>
                    <div className='descricao'>
                        <h4><label for='descrocao'>Descrição do prato</label></h4>
                        <textarea
                            placeholder="Descrição"
                            type="text"
                            name="descricao"
                            onChange={onChange}
                            value={form.descricao}
                        />
                    </div>
                    <button onClick={save}>Salvar Prato</button>
                </div>
            </div>

        </React.Fragment>
    );
};

export default Cadastro;