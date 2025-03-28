import React, { useEffect, useState } from 'react';
import './Cadastro.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../api';

export const Cadastro = () => {
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
        const [dialogMessage, setDialogMessage] = useState('');

    useEffect(() => {
            if (localStorage.getItem('id')) {
                navigate('/');
            }
        }, [navigate]);

    const cadastrar = async (event) => {
        event.preventDefault(); 

        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        if (!username || !email || !password) {
            console.error("Um ou mais campos de entrada não encontrados!");
            return; //Esse seria desnecessário já que coloquei os campos como required
        }

        const userData = {
            username: username.value,
            email: email.value,
            password: password.value,
            is_active: true, 
            is_admin: false
        };

        console.log(JSON.stringify(userData));

        try {
            const data = await createUser(userData);
            console.log('Sucesso:', data);
            
            navigate('/login');

        } catch (error) {
            console.error('Erro durante a requisição fetch:', error);
            setDialogMessage('Usuário ou email já existente');
            setShowDialog(true);
        }
    };

    const closeDialog = () => {
        setShowDialog(false);
    };

    return (
        <div className='cadastro-container'>
            <form onSubmit={cadastrar}> 
                <label htmlFor="username">Username</label> 
                <input type="text" id="username" required />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
                <br />
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" required />
                <br />
                <button type="submit">Cadastrar</button>
            </form>
            <br />
            <label htmlFor="">Já possuí uma conta?</label> <Link to={'/login'}> Entre</Link>

            {showDialog && (
                <dialog open>
                        <p>{dialogMessage}</p>
                        <button onClick={closeDialog}>Ok</button>
                    
                </dialog>
            )}

            
        </div>
    );
};