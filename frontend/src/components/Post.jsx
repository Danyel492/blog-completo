import React from 'react';
import './Post.css';

export const Post = ({ title, content, author, created_at }) => {
    return (
        <div>
            <div className="post">

                <h2>{title}</h2>
                <label className='author'>Autor: {author}</label>
                <p>{content}</p>
                <label className='date'>{created_at}</label>

            </div>
            <hr />
        </div>
    );
};