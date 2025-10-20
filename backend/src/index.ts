import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route';

// --- KONFIGURACJA DOTENV ---
// Musi być wywołane na samej górze, aby reszta aplikacji miała dostęp do .env
dotenv.config();

const main = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Połączono z bazą danych PostgreSQL.');

        const app = express();
        const port = process.env.PORT || 3000;
        app.use(express.json());

        // Mówimy aplikacji Express, aby wszystkie żądania
        // zaczynające się od '/api/auth' były obsługiwane przez nasz 'authRoutes'
        app.use('/api/auth', authRoutes);

        app.listen(port, () => {
            console.log(`Serwer uruchomiony na http://localhost:${port}`);
        });

    } catch (error) {
        console.error('Błąd podczas inicjalizacji aplikacji:', error);
    }
};

main();
