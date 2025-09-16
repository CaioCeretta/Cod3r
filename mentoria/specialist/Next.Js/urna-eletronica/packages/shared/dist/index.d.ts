declare class ErroValidacao extends Error {
    readonly status: number;
    constructor(mensagem: string, status?: number);
}

export { ErroValidacao };
