import React, { useState } from 'react';
import Logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import '../../styles/register.scss';

import api from '../../services/api';

export default function NewIncident() {
    const history = useHistory();

    const orgId = localStorage.getItem('org_id');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/incidents', {
            title,
            description,
            value
        }, {
            headers: {
                Authorization: orgId
            }
        }).catch(e => {console.log(e)});

        if (response.data.status)
            history.push('/dashboard');
    }

    return(
        <div className="NewIncident">
            <div className="container">
                <div className="leftContent">
                    <img src={Logo} alt="Be The Hero" className="logo"/>
                    <h1 className="pageTitle">Cadastrar novo caso</h1>
                    <p className="text">
                        Descreva o caso detalhadamente para 
                        encontrar um herói para resolver isso.
                    </p>
                    <Link to="/dashboard" className="auth-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        <span>Voltar para home</span>
                    </Link>
                </div>
                <div className="rightContent">
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            id="incident_title" 
                            placeholder="Título do caso"
                            required
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <textarea 
                            id="incident_description" 
                            cols="30" 
                            rows="5"
                            placeholder="Descrição"
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                        <input 
                            type="number" 
                            id="incident_value" 
                            placeholder="Valor em reais"
                            required
                            value={value}
                            onChange={e => setValue(parseInt(e.target.value))}
                        />
                        <button type="submit" className="buttonPrimary">
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}