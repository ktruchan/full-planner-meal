import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";
import {Router} from "express";

const prisma = new PrismaClient();
const router = Router();

router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({error: 'Username and password are required.'});
    }

    try {
        const existingUser = await prisma.user.findUnique({where: {username}});

        if (existingUser) {
            return res.status(400).json({error: 'User already exists'});
        }

        const password_hash = await bcrypt.hash(password, 12);

        const createdUser = await prisma.user.create({
            data: {username, password_hash}, select: {
                id: true,
                username: true,
                created_at: true,
            },
        });

        res.status(201).json(createdUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
})

export default router;
