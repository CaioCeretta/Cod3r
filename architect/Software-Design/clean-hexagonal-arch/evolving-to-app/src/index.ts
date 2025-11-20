import dotenv from "dotenv";

dotenv.config();

import express from "express";
import BCryptAdapter from "./adapters/auth/BCryptAdapter";
import JWTAdapter from "./adapters/auth/JWTokenAdapter";
import ColecaoTransacaoDB from "./adapters/db/ColecaoTransacaoDB";
import ColecaoUsuarioDB from "./adapters/db/ColecaoUsuarioDB";
import LoginUsuarioController from "./controllers/LoginUsuarioController";
import RegistrarUsuarioController from "./controllers/RegistrarUsuarioController";
import UsuarioMiddleware from "./controllers/UsuarioMiddleware";
import ExtratoMensal from "./core/transacao/ExtratoMensal";
import ExtratoMensalController from "./core/transacao/ExtratoMensalController";
import SalvarTransacao from "./core/transacao/SalvarTransacao";
import SalvarTransacaoController from "./core/transacao/SalvarTransacaoController";
import LoginUsuario from "./core/usuario/LoginUsuario";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------- Open Routes

const colecaoUsuario = new ColecaoUsuarioDB();
const provedorCripto = new BCryptAdapter();
const provedorToken = new JWTAdapter(process.env.JWT_SECRET);
const registrarUsuario = new RegistrarUsuario(colecaoUsuario, provedorCripto);
const loginUsuario = new LoginUsuario(
	colecaoUsuario,
	provedorCripto,
	provedorToken,
);

new RegistrarUsuarioController(app, registrarUsuario);
new LoginUsuarioController(app, loginUsuario);

// ----------------------------------------------------------------------------- Authenticated Routes

const colecaoTransacaoDB = new ColecaoTransacaoDB();
const usuarioMiddleware = UsuarioMiddleware(colecaoUsuario, provedorToken);
const salvarTransacao = new SalvarTransacao(colecaoTransacaoDB);
const extratoMensal = new ExtratoMensal(colecaoTransacaoDB);

new SalvarTransacaoController(app, salvarTransacao, usuarioMiddleware);
new ExtratoMensalController(app, extratoMensal, usuarioMiddleware);

// ----------------------------------------------------------------------------- Server configure and launch

const porta = process.env.EXPRESS_PORT;

app.listen(porta ?? 3001, () => {
	console.log(`Servidor está rodando na porta ${porta}`);
});
