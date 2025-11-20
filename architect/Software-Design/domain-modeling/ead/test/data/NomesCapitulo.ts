export default class NomesCapitulo {

    static aleatorio(): string {
        const indice = Math.floor(Math.random() * NomesCapitulo.nomes.length)
        return NomesCapitulo.nomes[indice]
    }

    static readonly nomes = [
        'Introdução',
        'Conclusão',
        'Conceitos Básicos',
        'Fundamentos',
        'Desafios',
        'Configuração do Ambiente',
        'Teoria',
        'Prática',
    ]
}