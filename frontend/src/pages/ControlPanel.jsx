import React, { useState, useEffect } from 'react';
import { getUserById, getPostsByUsername, getAllPosts, deletePost, togglePostStatus, getAllUsers } from '../api';
import { Post } from '../components/Post';
import { UpdatePost } from '../components/UpdatePost.jsx';
import { User } from '../components/User.jsx';
import './ControlPanel.css'; // Importar o arquivo de estilos

export const ControlPanel = () => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [username, setUsername] = useState('');
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [postToEdit, setPostToEdit] = useState(null);
    const [isUserListExpanded, setIsUserListExpanded] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('id');
            if (userId) {
                try {
                    const userData = await getUserById(userId);
                    setIsAdmin(userData.is_admin);
                    setUsername(userData.username);

                    if (userData.is_admin) {
                        // Se o usuário for admin, aparece todas as postagens
                        const allPosts = await getAllPosts();
                        setPosts(allPosts.reverse());

                        // Se o usuário for admin, aparece todos os usuários
                        const allUsers = await getAllUsers();
                        setUsers(allUsers.reverse());
                    } else {
                        // Aparece apenas as postagems do usuário comum logado
                        const userPosts = await getPostsByUsername(userData.username);
                        setPosts(userPosts.reverse());
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados do usuário:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Erro ao excluir postagem:', error);
        }
        window.location.reload();
    };

    const handleUpdatePostClick = (post) => {
        localStorage.setItem('postToEditId', post._id);
        setPostToEdit(post);
        setShowForm(true);
    };

    const handleToggleStatus = async (post) => {
        try {
            const newStatus = !post.is_active;
            await togglePostStatus(post._id, newStatus);
            setPosts(posts.map(p => p._id === post._id ? { ...p, is_active: newStatus } : p));
        } catch (error) {
            console.error('Erro ao ativar/desativar postagem:', error);
        }
    };

    const handleUserStatusChange = (userId, newStatus) => {
        setUsers(users.map(user => user._id === userId ? { ...user, is_active: newStatus } : user));
    };

    const toggleUserList = () => {
        setIsUserListExpanded(!isUserListExpanded);
    };

    if (isAdmin === null) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <UpdatePost showForm={showForm} setShowForm={setShowForm} post={postToEdit} />
            {isAdmin ? (
                <div className='admin-container'>
                    <h3>Painel do Administrador</h3>
                    <div className='mainContainer'>
                        <main>
                            <section>
                                <div>
                                    {posts.length === 0 ? (
                                        <div className='mainContainer'>
                                            <main>
                                                <section>
                                                    <p>Nenhuma postagem encontrada.</p>
                                                </section>
                                            </main>
                                        </div>
                                    ) : (
                                        <div className='mainContainer'>
                                            <main>
                                                <section className='control-painel-section'>
                                                    <h3>Lista de postagens</h3>
                                                    {posts.map((post) => (
                                                        <div className='control-painel-post' key={post._id}>
                                                            <div className='slider-container'>
                                                                <label className="switch">
                                                                    <input type="checkbox" checked={post.is_active} onChange={() => handleToggleStatus(post)} />
                                                                    <span className="slider"></span>
                                                                </label>
                                                                <label htmlFor="">Postagem {post.is_active ? 'Ativada' : 'Desativada'}</label>
                                                            </div>
                                                            <Post title={post.title} content={post.content} author={post.author} created_at={post.created_at} />
                                                            <div className='btn-container'>
                                                                <button onClick={() => handleUpdatePostClick(post)}>Alterar</button>
                                                                <button className='btn-danger' onClick={() => handleDelete(post._id)}>Excluir</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </section>
                                            </main>
                                        </div>
                                    )}
                                </div>
                            </section>
                            <section>
                                <h3>Lista de usuários</h3>
                                <button onClick={toggleUserList} className='btn-show-users'>
                                    {isUserListExpanded ? 'Esconder Lista de Usuários' : 'Mostrar Lista de Usuários'}
                                </button>
                                <div className={`user-list ${isUserListExpanded ? 'expanded' : ''}`}>
                                    {users.length === 0 ? (
                                        <p>Nenhum usuário encontrado.</p>
                                    ) : (
                                        <div>
                                            {users.map((user) => (
                                                <User key={user._id} user={user} onStatusChange={handleUserStatusChange} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            ) : (
                <div className='admin-container'>
                    <div className='mainContainer'>
                        <h3>Painel de usuário</h3>
                        {posts.length === 0 ? (
                            <div className='mainContainer'>
                                <main>
                                    <section>
                                        <p>Nenhuma postagem encontrada.</p>
                                    </section>
                                </main>
                            </div>
                        ) : (
                            <div className='mainContainer'>
                                <main>
                                    <section>

                                        {posts.map((post) => (
                                            <div className='control-painel-post'>
                                                <div key={post._id}>
                                                    <Post title={post.title} content={post.content} author={post.author} created_at={post.created_at} />
                                                    {!post.is_active && <label className='disable-post-text'>POSTAGEM DESATIVADA PELO ADMINISTRADOR!</label>}
                                                    <div className='btn-container'>

                                                        <button className='btn-danger' onClick={() => handleDelete(post._id)}>Excluir</button>
                                                        <button onClick={() => handleUpdatePostClick(post)}>Alterar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </section>
                                </main>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};