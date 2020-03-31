import React,{ useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import './styles.css';

import api from '../../services/api';

import {FiArrowLeft} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

export default function NewIncident(){

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');

    const history = useHistory();


    async function handleGravar(e){

        e.preventDefault();

        const data = {
                        title,
                        description,
                        value
        };

        const ongId = localStorage.getItem("ongId");

        console.log(ongId);

        try{

            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });
            
            history.push('/profile')

        } catch (err) {
            
            alert("Erro ao gravar caso, tente novamente!")

        }

    }

    return (


        <div className="newincident-container">
            
            <div className="content">
            <section>

                <img src={logoImg} alt="To Be Heroes" />

                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" /> 
                        Voltar para home
                </Link>
            </section>

            <form onSubmit={handleGravar}>

                <input placeholder="Titulo do caso"
                       value={title}
                       onChange={ e => setTitle(e.target.value) } />

                <textarea placeholder="Descrição"
                          value={description}
                          onChange={ e => setDescription(e.target.value) } />

                <NumberFormat thousandSeparator={"."} 
                              decimalSeparator={","}
                              decimalScale = {2}
                              fixedDecimalScale = {true}
                              onValueChange={(values) => setValue(values.value)}
                               />

                <button className="button" type="submit">Cadastrar</button>

            </form>
        </div>

        </div>
    );

}