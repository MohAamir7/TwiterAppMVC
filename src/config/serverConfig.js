import dotenv from 'dotenv';

dotenv.config() // Load enviroment variables from .env file

export const PORT = parseInt(process.env.PORT) || 4000; // Define PORT as variable