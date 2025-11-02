import dotenv from "dotenv";

dotenv.config();

import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const porta = process.env.EXPRESS_PORT;

app.listen(porta ?? 3001, () => {
	console.log(`Servidor está rodando na porta ${porta}`);
});
