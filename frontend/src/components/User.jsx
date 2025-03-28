import React from 'react';
import './User.css';
import { toggleUserStatus } from '../api';

export const User = ({ user, onStatusChange }) => {
    const handleToggleStatus = async () => {
        try {
            const newStatus = !user.is_active;
            await toggleUserStatus(user._id, newStatus);
            onStatusChange(user._id, newStatus);
        } catch (error) {
            console.error('Erro ao ativar/desativar usuário:', error);
        }
    };

    return (
        <div className="user-container">
            <div>
                <h2 htmlFor="">{user.username}</h2>
            </div>
            {user.is_admin ? (
                <div>
                    <label>Esse usuário é um administrador</label>
                </div>
            ) : (
                <div className='each-user'>
                    <div>
                        <label className="switch">
                            <input type="checkbox" checked={user.is_active} onChange={handleToggleStatus} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div>
                        <label>Usuário {user.is_active ? 'Ativado' : 'Desativado'}</label>
                    </div>
                </div>
            )}
        </div>
    );
};