import React, { useEffect, useState } from 'react';
import { Aside } from '../components/Aside';
import './home.css';
import { Post } from '../components/Post';
import { getActivePosts } from '../api';


export const Home = ({ setShowForm }) => {
    const [posts, setPosts] = useState([]);
    

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getActivePosts();
                setPosts(data.reverse());
            } catch (error) {
                console.error('Erro ao buscar postagens:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleCreatePostClick = () => {
        setShowForm(true);
    };

    return (
        <div className='mainContainer'>
            <main>
                <section>
                    <button onClick={handleCreatePostClick} style={{ display: localStorage.getItem('id') ? 'flex' : 'none' }}>Criar Postagem</button>
                    <div>
                        {posts.map((post) => (
                            <Post key={post._id} title={post.title} content={post.content} author={post.author} created_at={post.created_at} />
                        ))}
                    </div>
                </section>
                <Aside />
            </main>
        </div>
    );
};