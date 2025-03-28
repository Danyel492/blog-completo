import { Post } from "../models/post.js";

export class PostController {
    async create(req, res) {
        console.log(req.body);

        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            created_at: req.body.created_at,
            changed_at: req.body.changed_at,
            is_active: req.body.is_active
        });

        try {
            await post.save(post);
            res.status(201).json({ message: 'Postagem criada com sucesso', post });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Erro ao criar postagem', error });
        }
    }
    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Postágem não encontrado' });
            }
            res.status(200).json({ message: 'Postágem deletada com sucesso' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao deletar postágem', error });
        }
    }
    async getAll(req, res) {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao buscar postagens', error });
        }
    }

    async getActive(req, res) {
        try {
            const activePosts = await Post.find({ is_active: true });
            res.status(200).json(activePosts);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao buscar postagens ativas', error });
        }
    }

    async getPostByUsername(req, res) {
        try {
            const posts = await Post.find({ author: req.params.author });
            if (posts.length === 0) {
                return res.status(404).json({ message: 'Nenhuma postagem encontrada para este usuário' });
            }
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao buscar postagens do usuário', error });
        }
    }

    async getById(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Postagem não encontrado' });
            }
            res.status(200).json(post);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao buscar postagem', error });
        }
    }
    async isActive(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Postagem não encontrada' });
            }
            post.is_active = req.body.is_active;
            await post.save();
            res.status(200).json({ message: 'Status da postagem atualizado com sucesso', post });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao atualizar status da postagem', error });
        }
    }
    async changeContent(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Postagem não encontrada' });
            }
            post.content = req.content;
            post.title = req.title;
            await post.save();
            res.status(200).json({ message: 'Status da postagem atualizado com sucesso', post });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao atualizar status da postagem', error });
        }
    }
    async update(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    title: req.body.title,
                    content: req.body.content,
                    author: req.body.author,
                    changed_at: req.body.changed_at
                },
                { new: true, runValidators: true }
            );
            if (!post) {
                return res.status(404).json({ message: 'Postagem não encontrada' });
            }
            res.status(200).json({ message: 'Postagem atualizada com sucesso', post });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao atualizar postagem', error });
        }
    }

    
}