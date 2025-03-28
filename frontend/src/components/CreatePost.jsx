import React, { useState, useEffect } from 'react';
import './CreatePost.css';
import { getUserById, createPost } from '../api';

export const CreatePost = ({ showForm, setShowForm }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('id');
            if (userId) {
                try {
                    const userData = await getUserById(userId);
                    setUserData(userData);
                } catch (error) {
                    console.error('Erro ao buscar dados do usuário:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const userId = localStorage.getItem('id');

        try {
            const userData = await getUserById(userId);
            const username = userData.username;

            const postData = {
                title: title,
                content: content,
                author: username
            };

            const data = await createPost(postData);
            console.log('Postagem criada com sucesso:', data);
            setTitle('');
            setContent('');
            window.location.reload();
            setShowForm(false); // Oculta o formulário de criar postagem após o envio bem sucedido

        } catch (error) {
            console.error('Erro durante a requisição fetch:', error);

        }
    };

    const handleCancel = () => {
        setShowForm(false); // Oculta o formulário ao clicar em "Cancelar"
        setTitle('');
        setContent('');
    };

    if (userData && userData.is_active === false) {
        return (
            <div className='createPostContainer' style={{ display: showForm ? 'flex' : 'none' }}>
                <form action="">
                    <div className='aviso-bloqueio'>
                        <p>Você está bloqueado pelo administrador</p>
                        <p>e não pode fazer novas postagens</p>
                    </div>
                    <button className='btn-danger' type="button" onClick={handleCancel}>Voltar</button>
                </form>
            </div>
        );
    } else {


        return (
            <div className='createPostContainer' style={{ display: showForm ? 'flex' : 'none' }}> 
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="titleContainer">
                            <label className='postTitle' htmlFor="title">
                                <h2>Título</h2>
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="contentContainer">
                            <label htmlFor="content">
                                <h2>Conteúdo</h2>
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                        <div className="btnContainer">
                            <button className='btn-danger' type="button" onClick={handleCancel}>Cancelar</button>
                            <button type="submit">Enviar Postagem</button>
                        </div>
                        <label htmlFor="">{author}</label>
                    </form>
                </div>
            </div>
        );
    }
};