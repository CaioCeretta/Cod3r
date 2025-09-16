"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  loginUsuario: () => loginUsuario,
  registrarUsuario: () => registrarUsuario
});
module.exports = __toCommonJS(index_exports);

// src/usuario/service/loginUsuario.ts
var import_shared = require("@urna/shared");
async function loginUsuario(props) {
  const { repo, cripto, email, senha } = props;
  const usuario = await repo.buscarPorEmail(email);
  if (!usuario) {
    throw new import_shared.ErroValidacao("User not found");
  }
  const senhaCorreta = await cripto.comparar(senha, usuario.senha);
  if (!senhaCorreta) {
    throw new import_shared.ErroValidacao("Invalid Password");
  }
  return { ...usuario, senha: void 0 };
}

// src/usuario/service/registrarUsuario.ts
var import_shared2 = require("@urna/shared");
async function registrarUsuario(props) {
  const { repo, usuario } = props;
  if (!usuario) {
    throw new import_shared2.ErroValidacao("Informacoes nao enviadas");
  }
  const usuarioExistente = await repo.buscarPorEmail(usuario.email);
  if (usuarioExistente) throw new Error("Usu\xE1rio j\xE1 existe");
  const senhaCriptografada = await props.cripto.criptografar(usuario.senha);
  await repo.salvar({ ...usuario, senha: senhaCriptografada });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loginUsuario,
  registrarUsuario
});
