import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import Logo from '../../assets/logo.svg';
import './style.scss';
import api from '../../services/api';

export default function Dashboard() {
    const history = useHistory();

    const orgId = localStorage.getItem('org_id');
    const orgName = localStorage.getItem('org_name');
    
    function logout() {
        localStorage.removeItem('org_id');
        localStorage.removeItem('org_name');
        history.push('/');
    }

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (orgId) {
                const response = await api.get('/profile', {
                    headers: {
                        Authorization: orgId
                    }
                }).catch(e => {
                    console.log(e);
                });
    
                setIncidents(response.data.incidents);
            }
        }

        fetchData();
    }, [orgId]);

    async function handleDelete(id) {
        const response = await api
            .delete(`/incidents/${id}`, {
                headers: {
                    Authorization: orgId
                }
            })
            .catch(e => {console.log(e)});

        if (response.data.status)
            setIncidents(incidents.filter(incident => incident.id !== id));
    }

    return(
        <div className="Dashboard">
            <div className="container">
                <header>
                    <img src={Logo} alt="Be The Hero" className="logo"/>
                    <div className="greetings">Bem vinda, {orgName}</div>
                    <Link to="/new-incident" className="buttonPrimary">
                        Cadastrar novo caso
                    </Link>
                    <button onClick={logout} className="logout">
                        <FiPower size={18} color="#E02041" />
                    </button>
                </header>
                <h1 className="pageTitle">Casos cadastrados</h1>
                <div className="incidents">
                    {incidents.length ? incidents.map(incident => (
                        <div className="incident" key={incident.id}>
                            <button 
                                className="delete" 
                                onClick={() => handleDelete(incident.id)
                            }>
                                <FiTrash2 size={24} color="#A8A8B3" />
                            </button>
                            <div className="infoGroup">
                                <div className="label">CASO:</div>
                                <div className="text">{incident.title}</div>
                            </div>
                            <div className="infoGroup">
                                <div className="label">DESCRIÇÃO:</div>
                                <div className="text">{incident.description}</div>
                            </div>
                            <div className="infoGroup">
                                <div className="label">VALOR:</div>
                                <div className="text">R$ {incident.value} reais</div>
                            </div>
                        </div>
                    )) : <p>Nenhum caso cadastrado</p>}
                </div>
            </div>
        </div>
    )
}