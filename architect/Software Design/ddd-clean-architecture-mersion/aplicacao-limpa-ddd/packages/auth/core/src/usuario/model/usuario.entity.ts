export interface UsuarioProps {
	id?: string;
	nome?: string;
	email?: string;
	senha?: string;
	createdAt?: Date;
}

export default class Usuario {
	constructor(readonly props: UsuarioProps) {}

	clone(props: Partial<UsuarioProps>): Usuario {
		return new Usuario({ ...this.props, ...props });
	}
}

const usuario = new Usuario({
	id: "1",
	nome: "Caio",
	senha: "123",
	email: "caio@zmail.com",
	createdAt: new Date(),
});

console.log(usuario);
// const usuario = new Usuario({
// 	id: "1",
// 	nome: "Caio",
// 	email: "caio@zmail.com",
// 	senha: "123456",
// });

// console.log(usuario);
