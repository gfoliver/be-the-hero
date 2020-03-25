import React, { useState } from 'react';
import Logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import '../../styles/register.scss';
import { Link } from 'react-router-dom';

import api from '../../services/api';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    
    const [registered, setRegistered] = useState(false);
    const [orgId, setOrgId] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        
        const response = await api.post('/orgs', {
            name,
            email,
            whatsapp,
            city,
            state
        }).catch(e => {
            console.log(e);
        });

        setOrgId(response.data.id);
        setRegistered(true);
    }

    return(
        <div className="Register">
            <div className="container">
                <div className="leftContent">
                    <img src={Logo} alt="Be The Hero" className="logo"/>
                    <h1 className="pageTitle">Cadastro</h1>
                    <p className="text">
                        Faça seu cadastro, entre na plataforma e ajude 
                        pessoas a encontrarem os casos da sua ONG.
                    </p>
                    <Link to="/" className="auth-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        <span>Voltar para o login</span>
                    </Link>
                </div>
                <div className="rightContent">
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            id="org_name" 
                            placeholder="Nome da ONG"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input 
                            type="email" 
                            id="org_email" 
                            placeholder="E-mail"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input 
                            type="tel" 
                            id="org_whatsapp" 
                            placeholder="WhatsApp"
                            required
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />
                        <div className="row">
                            <input 
                                type="text" 
                                id="org_city" 
                                className="w-80" 
                                placeholder="Cidade"
                                required
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
                            <input 
                                type="text" 
                                id="org_state" 
                                className="w-20" 
                                placeholder="UF"
                                required
                                value={state}
                                onChange={e => setState(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="buttonPrimary">
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
            {registered && 
                <div className="idModal">
                    <h2 className="pageTitle">Seu id é {orgId}</h2>
                    <p>
                        Salve esse ID, é com ele que você fará login na plataforma. <br />
                        O ID é único e não deve ser compartilhado.
                    </p>
                    <Link to="/" className="buttonPrimary">Voltar para o Login</Link>
                </div>
            }
        </div>
    )
}