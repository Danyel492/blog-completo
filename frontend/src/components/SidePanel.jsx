import React, { useState, useEffect } from "react";
import './SidePanel.css';
import { Link } from "react-router-dom";
import { getUserById } from '../api';

export const SidePanel = () => {
    const [username, setUsername] = useState('');


    const logoff = () => {
        localStorage.removeItem('id');
        window.location.reload();
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('id');
            if (userId) {
                try {
                    const userData = await getUserById(userId);
                    setUsername(userData.username);
                } catch (error) {
                    console.error('Erro durante a requisição fetch:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    if (localStorage.getItem('id')) {
        return (
            <>
                <div className="userContainer">
                    <div className="wellcome">
                        <div>
                            <label htmlFor="">Olá, </label>
                            <span htmlFor="">@{username}</span>
                        </div>
                        <div className="btn-container">
                            <Link style={{ textDecoration: 'none' }} to='/painel'><button>Painel de Controle</button></Link>
                            <button className="btn-danger" onClick={logoff}>Sair</button>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className="side-panel">
                <label htmlFor="">Você precisa estar logado para criar suas postagens</label>
                <br />
                <label htmlFor=""> <Link to='/cadastro'>Cadastre-se</Link> | <Link to='/login'>Entre</Link></label>
            </div>
        );
    }
};