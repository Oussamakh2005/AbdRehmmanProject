import prisma from "../../lib/db.mjs";
export const createPost = async (req, res) => {
    try {
        const { content, authorId, image } = req.body;
        console.log({ content, authorId, image });
        const user = await prisma.user.findUnique({
            where: { id: authorId }
        });
        if (!user) {
            return res.status(400).json({ ok: false, message: "User not found" });
        }
        const post = await prisma.post.create({
            data: {
                content,
                authorId,
                image: image || ""
            }
        });
        if (!post) {
            return res.status(400).json({ ok: true, message: "Post not created" });
        }
        return res.status(201).json({ ok: true, message: "Post created", post });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error
        });
    }
};
export const updetePost = async (req, res) => {
    try {
        const { content, image } = req.body;
        const idPost = req.query.id;
        const post = await prisma.post.findUnique({
            where: { id: idPost }
        });
        const newPost = await prisma.post.update({
            where: { id: idPost },
            data: {
                content: content || post?.content,
                image: image || post?.image
            }
        });
        if (!newPost) {
            return res.status(400).json({ ok: false, message: "Post not updated" });
        }
        return res.status(201).json({ ok: true, message: "Post updated", newPost });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error
        });
    }
};
export const deletePost = async (req, res) => {
    try {
        const idPost = req.query.id;
        const isexistePost = await prisma.post.findUnique({
            where: { id: idPost }
        });
        if (!isexistePost) {
            return res.status(400).json({ ok: false, message: "Post not found" });
        }
        const deleteComments = await prisma.comment.deleteMany({
            where: { postId: idPost },
        });
        const deleteLikes = await prisma.like.deleteMany({
            where: { postId: idPost },
        });
        const post = await prisma.post.delete({
            where: { id: idPost }
        });
        if (!post) {
            return res.status(400).json({ message: "Post not deleted" });
        }
        return res.status(201).json({ ok: true, message: "Post deleted", post });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error
        });
    }
};
export const getPost = async (req, res) => {
    try {
        const idPost = req.query.id;
        const post = await prisma.post.findUnique({
            where: { id: idPost },
            include: {
                user: true,
                comment: true,
                like: true,
                _count: {
                    select: {
                        comment: true,
                        like: true,
                    }
                }
            },
        });
        if (!post) {
            return res.status(400).json({ ok: false, message: "Post not found" });
        }
        return res.status(201).json({
            ok: true,
            message: "Post found",
            posts: post,
            countOfLikes: post.like.length,
            countOfComments: post.comment.length,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error
        });
    }
};
export const allPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const posts = await prisma.post.findMany({
            include: {
                user: true,
                comment: true,
                like: true,
                _count: {
                    select: {
                        comment: true,
                        like: true,
                    }
                }
            },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        });
        if (posts.length <= 0) {
            return res.status(404).json({ ok: false, message: "No posts found" });
        }
        return res.status(200).json({
            ok: true,
            message: "Posts found",
            posts,
            countOfPosts: posts.length,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error,
        });
    }
};
export const myPosts = async (req, res) => {
    try {
        const idUser = req.query.id;
        const posts = await prisma.post.findMany({
            where: { authorId: idUser },
            include: {
                user: true,
                comment: true,
                like: true,
                _count: {
                    select: {
                        comment: true,
                        like: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });
        if (posts.length <= 0) {
            return res.status(404).json({ ok: false, message: "No posts found" });
        }
        return res.status(200).json({
            ok: true,
            message: "Posts found",
            posts,
            countOfPosts: posts.length,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error,
        });
    }
};
