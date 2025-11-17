export default class Email {
    constructor(readonly valor: string, atributo: string = "e-mail") {
        if (!valor) {
            throw new Error(`O ${atributo} deve ser informado.`)
        }
        if (!valor.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)) {
            throw new Error(`O ${atributo} informado não é válido.`)
        }
    }

    get nomeUsuario(): string {
        return this.valor.split("@")[0]
    }

    get dominio(): string {
        return this.valor.split("@")[1]
    }
}
