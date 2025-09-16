interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

interface ProvedorSenhaCriptografada {
    criptografar(senha: string): Promise<string>;
    comparar(senha: string, senhaCriptografada: string): Promise<boolean>;
}

interface RepositorioUsuario {
    buscarPorEmail(email: string): Promise<Usuario | null>;
    buscarPorId(id: number): Promise<Usuario | null>;
    salvar(usuario: Usuario): Promise<void>;
}

declare function loginUsuario(props: {
    repo: RepositorioUsuario;
    cripto: ProvedorSenhaCriptografada;
    email: string;
    senha: string;
}): Promise<Usuario | never>;

declare function registrarUsuario(props: {
    repo: RepositorioUsuario;
    cripto: ProvedorSenhaCriptografada;
    usuario: Partial<Usuario>;
}): Promise<void>;

export { type ProvedorSenhaCriptografada, type RepositorioUsuario, type Usuario, loginUsuario, registrarUsuario };
