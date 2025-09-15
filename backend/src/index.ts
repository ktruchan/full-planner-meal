import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';
import {AppDataSource} from "./data-source.js";

dotenv.config();

const app = express();

AppDataSource.initialize()
    .then(() => {
        // Po udanym połączeniu z bazą danych, uruchom serwer Express
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });

        console.log('Connected to the database!');
    })
    .catch((error) => console.log("Database connection error: ", error));
