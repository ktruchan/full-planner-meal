import {Request, Response} from 'express';
import {AppDataSource} from '../data-source';
import {User} from "../entities/User";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthController {

    /**
     * @description Rejestruje nowego użytkownika w systemie.
     */
    static async register(req: Request, res: Response): Promise<Response> {
        const {email, password} = req.body;

        // TODO:: add validation 'zod' or 'class-validator'
        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required.'});
        }

        try {
            const userRepository = AppDataSource.getRepository(User);
            const existingUser = await userRepository.findOne({where: {email}});
            if (existingUser) {
                return res.status(400).json({message: 'User already exists'});
            }

            const user = new User();
            user.email = email;
            user.password = password; // Hasło zostanie zahashowane przez hook BeforeInsert

            await userRepository.save(user);

            return res.status(201).json({id: user.id, email: user.email});
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Wewnętrzny błąd serwera podczas rejestracji'});
        }
    }

    static async login(req: Request, res: Response): Promise<Response> {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required.'});
        }

        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({email});

            if (!user) {
                return res.status(400).json({message: 'Nieprawidłowy email lub hasło'});
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({message: 'Nieprawidłowy e-mail lub hasło'});
            }
            // generujemy token jwt
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ message: 'Zalogowano pomyślnie', token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Wewnętrzny błąd serwera podczas logowania'});
        }
    }
}
