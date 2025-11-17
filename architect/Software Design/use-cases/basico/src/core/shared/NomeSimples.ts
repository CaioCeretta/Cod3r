export default class NomeSimples {
    constructor(
        readonly completo: string,
        atributo: string = "nome",
        min: number = 3,
        max: number = 120
    ) {
        if (min > max) {
            throw new Error(
                "O valor mínimo não pode ser maior que o valor máximo."
            )
        }
        if (!completo) {
            throw new Error(`O ${atributo} deve ser informado.`)
        }
        if (completo.length < min || completo.length > max) {
            throw new Error(
                `O ${atributo} deve ter entre ${min} e ${max} caracteres.`
            )
        }
    }
}
