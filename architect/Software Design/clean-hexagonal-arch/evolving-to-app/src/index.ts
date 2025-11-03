import dotenv from "dotenv";

dotenv.config();

import express from "express";
import BCryptAdapter from "./adapters/auth/BCryptAdapter";
import ColecaoUsuarioDB from "./adapters/db/knex/ColecaoUsuarioDB";
import LoginUsuarioController from "./controllers/LoginUsuarioController";
import RegistrarUsuarioController from "./controllers/RegistrarUsuarioController";
import LoginUsuario from "./core/usuario/LoginUsuario";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------- Open Routes

const colecaoUsuario = new ColecaoUsuarioDB();
const provedorCripto = new BCryptAdapter();
const registrarUsuario = new RegistrarUsuario(colecaoUsuario, provedorCripto);
new RegistrarUsuarioController(app, registrarUsuario);

// ----------------------------------------------------------------------------- Authenticated Routes

const loginUsuario = new LoginUsuario(colecaoUsuario, provedorCripto);
new LoginUsuarioController(app, loginUsuario);

// ----------------------------------------------------------------------------- Server configure and launch

const porta = process.env.EXPRESS_PORT;

app.listen(porta ?? 3001, () => {
	console.log(`Servidor está rodando na porta ${porta}`);
});
