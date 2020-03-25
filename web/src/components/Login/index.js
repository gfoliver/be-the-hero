import React, { useState } from 'react';
import Logo from '../../assets/logo.svg';
import HeroesImg from '../../assets/heroes.png';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

export default function Login() {
    const history = useHistory();

    const [orgId, setOrgId] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api
            .post('/login', {
                id: orgId
            })
            .catch(e => {
                console.log(e);
                alert('Falha no login');
            });

        localStorage.setItem('org_id', orgId);
        localStorage.setItem('org_name', response.data.name);

        history.push('/dashboard');
    }

    return(
        <div className="Login">
            <div className="container">
                <div className="leftContent">
                    <img src={Logo} alt="Be The Hero" className="logo"/>
                    <h1 className="pageTitle">Faça seu login</h1>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            id="org_id" 
                            placeholder="Sua ID"
                            required
                            value={orgId}
                            onChange={e => setOrgId(e.target.value)}
                        />
                        <button type="submit" className="buttonPrimary">Entrar</button>
                    </form>
                    <Link to="/register" className="auth-link">
                        <FiLogIn size={16} color="#E02041" />
                        <span>Não tenho cadastro</span>
                    </Link>
                </div>
                <div className="rightContent">
                    <img src={HeroesImg} alt="Heroes icon" className="heroes" />
                </div>
            </div>
        </div>
    )
}