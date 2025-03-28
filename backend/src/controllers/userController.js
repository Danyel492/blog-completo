import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'

export class UserController {
    async create(req, res) {
        console.log(req.body);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            is_active: req.body.is_active,
            is_admin: req.body.is_admin
        });

        try {
            await user.save(user);
            res.status(201).json({ message: 'Usuário criado com sucesso', user });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Erro ao criar usuário', error });
        }
    }
    async delete(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao deletar usuário back', error });
        }
    }
    async getAll(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao buscar usuários', error });
        }
    }

    async getById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao buscar usuário', error });
        }
    }
    
    async authenticate(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            const isMatch = await user.comparePassword(req.body.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Senha incorreta' });
            }

            const token = jwt.sign({ id: user._id }, 'seu_segredo', { expiresIn: '1h' });
            res.status(200).json({ message: 'Autenticação bem-sucedida', token, id: user._id });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao autenticar usuário', error });
        }
    }

    async isActive(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            user.is_active = req.body.is_active;
            await user.save();
            res.status(200).json({ message: 'Status do usuário atualizado com sucesso', user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao atualizar status do usuário', error });
        }
    }

    
}
