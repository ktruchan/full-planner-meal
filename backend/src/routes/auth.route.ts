import { Router } from 'express';
import {AuthController} from "../controllers/AuthController";

const router = Router();

// Pełna ścieżka będzie: POST /api/auth/register
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

export default router;
