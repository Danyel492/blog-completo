import React, { useState, useEffect } from 'react';
import './UpdatePost.css';
import { updatePost } from '../api';

export const UpdatePost = ({ showForm, setShowForm, post }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const postData = {
                title: title,
                content: content,
                author: post.author
            };

            const postId = localStorage.getItem('postToEditId'); 
            const data = await updatePost(postId, postData);
            console.log('Postagem alterada com sucesso:', data);
            setTitle('');
            setContent('');
            setShowForm(false); // Oculta o formulário de editar postagem após o envio bem sucedido
            window.location.reload();

        } catch (error) {
            console.error('Erro durante a requisição fetch:', error);
            
        }
    };

    const handleCancel = () => {
        setShowForm(false); // Oculta o formulário ao clicar em "Cancelar"
        setTitle('');
        setContent('');
    };

    if (!showForm) {
        return null;
    }

    return (
        <div className='updatePostContainer' style={{ display: showForm ? 'flex' : 'none' }}> 
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
                        <button type="submit">Atualizar Postagem</button>
                        <button className='btn-danger' type="button" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};