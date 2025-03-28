import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';
import { authenticateUser } from '../api';

export const Login = () => {
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    useEffect(() => {
        if (localStorage.getItem('id')) {
            navigate('/');
        }
    }, [navigate]);

    const logar = async (event) => {
        event.preventDefault();

        const userData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        try {
            const data = await authenticateUser(userData);
            console.log('Sucesso:', data);

            localStorage.setItem('id', data.id);

            window.location.reload();
        } catch (error) {
            console.error('Erro durante a requisição fetch:', error);
            let msgErro = ''
            if (error == 'Error: Erro HTTP! status: 401, message: Senha incorreta') {
                msgErro = 'Senha incorreta'
            } else {
                msgErro = 'Usuário não encontrado'
            }
            setDialogMessage(`${msgErro}`);
            setShowDialog(true);
        }
    };

    const closeDialog = () => {
        setShowDialog(false);
    };

    return (
        <div className='login-container'>
            <form onSubmit={logar}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" required />
                <br />
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" required />
                <br />
                <button type="submit">Logar</button>
            </form>
            <label htmlFor="">Não tem cadastro?</label> <Link to={'/cadastro'}> Cadastre-se</Link>

            {showDialog && (
                <dialog open>
                        <p>{dialogMessage}</p>
                        <button onClick={closeDialog}>Ok</button>
                    
                </dialog>
            )}
        </div>
    );
};
