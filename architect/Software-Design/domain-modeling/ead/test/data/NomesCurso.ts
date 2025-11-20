export default class NomesCurso {
	static aleatorio(): string {
		const indice = Math.floor(Math.random() * NomesCurso.nomes.length);
		return NomesCurso.nomes[indice];
	}

	static readonly nomes = [
		"Arquitetura Limpa",
		"Banco de Dados",
		"Casos de Uso",
		"Código Limpo",
		"Design Patterns",
		"Express.js",
		"Fundamentos de React",
		"HTML, CSS e JavaScript",
		"Iniciando na Programação",
		"Introdução ao JavaScript",
		"Introdução ao TypeScript",
		"Lógica de Programação",
		"MongoDB",
		"Next.js",
		"Node.js",
		"React com Tailwind CSS",
		"SOLID",
		"TDD",
		"Testes de Software",
		"TypeORM",
		"TypeScript",
	];
}
