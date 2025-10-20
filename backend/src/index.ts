import express from 'express';
import { PrismaClient } from '@prisma/client';
import usersRouter from './routes/users';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Ready!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

//obsługa zamykania serwera i rozłączania z bazą danych
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

