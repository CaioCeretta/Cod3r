export default class SenhaForte {
    constructor(readonly valor: string) {
        if(!valor) throw new Error('Senha não pode ser vazia')
        if(valor.length < 8) throw new Error('Senha deve ter no mínimo 8 caracteres')
        if(!valor.match(/[a-z]/)) throw new Error('Senha deve ter pelo menos uma letra minúscula')
        if(!valor.match(/[A-Z]/)) throw new Error('Senha deve ter pelo menos uma letra maiúscula')
        if(!valor.match(/[0-9]/)) throw new Error('Senha deve ter pelo menos um número')
        if(!valor.match(/[^a-zA-Z0-9]/)) throw new Error('Senha deve ter pelo menos um caractere especial')
    }
}