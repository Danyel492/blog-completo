const API_BASE_URL = 'http://fantastic-cooperation-production.up.railway.app:3000';

// Função para autenticar o usuário
export const authenticateUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/user/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro HTTP! status: ${response.status}, message: ${errorData.message || response.statusText}`);
    }

    return await response.json();
};

// Função para criar um novo usuário
export const createUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro HTTP! status: ${response.status}, message: ${errorData.message || response.statusText}`);
    }

    return await response.json();
};

// Função para obter dados do usuário pelo ID
export const getUserById = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/user/id/${userId}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro HTTP! status: ${response.status}, message: ${errorData.message || response.statusText}`);
    }

    return await response.json();
};

// Função para obter todas os usuários
export const getAllUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/user/all`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro HTTP! status: ${response.status}, message: ${errorData.message || response.statusText}`);
    }

    return await response.json();
};

// Função para criar um novo post
export const createPost = async (postData) => {
    const response = await fetch(`${API_BASE_URL}/post/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro HTTP! status: ${response.status}, message: ${errorData.message || response.statusText}`);
    }

    return await response.json();
};

// Função para alterar uma postagem feita
export const updatePost = async (postId, postData) => {
    const response = await fetch(`${API_BASE_URL}/post/update/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro HTTP! status: ${response.status}, message: ${errorData.message || response.statusText}`);
    }

    return await response.json();
};

// Função para obter todas as postagens
export const getAllPosts = async () => {
    const response = await fetch(`${API_BASE_URL}/post/all`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro HTTP! status: ${response.status}, message: ${errorData.message || response.statusText}`);
    }

    return await response.json();
};

// Função para obter apenas as postagens ativas
export const getActivePosts = async () => {
    const response = await fetch(`${API_BASE_URL}/post/active`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro HTTP! status: ${response.status}, message: ${errorData.message || response.statusText}`);
    }

    return await response.json();
};

// Função para obter postagens ativas de um usuário específico pelo username
export const getPostsByUsername = async (username) => {
    const response = await fetch(`${API_BASE_URL}/post/user/${username}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro HTTP! status: ${response.status}, message: ${errorData.message || response.statusText}`);
    }

    return await response.json();
};

// Função para excluir uma postagem
export const deletePost = async (postId) => {
    const response = await fetch(`${API_BASE_URL}/post/delete/${postId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro HTTP! status: ${response.status}, message: ${errorData.message || response.statusText}`);
    }

    return await response.json();
};

// Função para ativar/desativar uma postagem
export const togglePostStatus = async (postId, isActive) => {
    const response = await fetch(`${API_BASE_URL}/post/is_active/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_active: isActive })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro HTTP! status: ${response.status}, message: ${errorData.message || response.statusText}`);
    }

    return await response.json();
};

// Função para ativar/desativar um usuário
export const toggleUserStatus = async (userId, isActive) => {
    const response = await fetch(`${API_BASE_URL}/user/is_active/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_active: isActive })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro HTTP! status: ${response.status}, message: ${errorData.message || response.statusText}`);
    }

    return await response.json();
};