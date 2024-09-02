import prisma from "../../lib/db.mjs";
export const ToggleLike = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        const existingLike = await prisma.like.findFirst({
            where: {
                AND: [
                    { postId: postId },
                    { userId: userId }
                ]
            },
        });
        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
            return res.status(200).json({ ok: true, liked: false });
        }
        else {
            await prisma.like.create({
                data: {
                    userId,
                    postId,
                },
            });
            return res.status(200).json({ ok: true, liked: true });
        }
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error,
        });
    }
};
export const isLiked = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        const existingLike = await prisma.like.findFirst({
            where: {
                AND: [
                    { postId: postId },
                    { userId: userId }
                ]
            },
        });
        const numberOfLike = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                _count: {
                    select: {
                        like: true,
                    }
                }
            }
        });
        if (!existingLike) {
            return res.status(200).json({ ok: true, liked: false, numberOfLike });
        }
        return res.status(200).json({ ok: true, liked: true, numberOfLike });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error,
        });
    }
};
export const getLikes = async (req, res) => {
    try {
        const postId = req.query.id;
        const likes = await prisma.like.findMany({
            where: {
                postId: postId
            },
            include: {
                user: true,
            }
        });
        if (likes.length <= 0) {
            return res.status(200).json({ ok: true, likes: [] });
        }
        return res.status(200).json({ ok: true, likes: likes });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error,
        });
    }
};
