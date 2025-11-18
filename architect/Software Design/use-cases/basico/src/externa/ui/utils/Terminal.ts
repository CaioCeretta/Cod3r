/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import { terminal } from "terminal-kit";
import type { InputFieldOptions } from "terminal-kit/Terminal";

export default class Terminal {
	static titulo(texto: string) {
		terminal.clear();
		terminal.bold.magenta()(`${texto}\n`);
		terminal.bold.magenta(`-`.repeat(texto.length));
	}

	static async menu(titulo: string, opcoes: string[]) {
		Terminal.titulo(titulo);
		const opcao = await terminal.singleColumnMenu(opcoes).promise;
		return [opcao.selectedIndex, opcao.selectedText];
	}

	static async esperarEnter(): Promise<void> {
		terminal.white("\nPressione ENTER para continuar");
		await terminal.inputField({ echo: false }).promise;
	}

	static async campoRequerido(
		label: string,
		opcoes?: InputFieldOptions,
	): Promise<string> {
		terminal.gray(`\n${label}: `);
		const valor = await terminal.inputField(opcoes).promise;
		if (valor?.trim()) return valor;
		return Terminal.campoRequerido(label, opcoes);
	}

	static async tabela(dados: any[]) {
		terminal("\n");
		terminal.table([
			Object.keys(dados[0]),
			...dados.map((d) => Object.values(d) as any),
		]);
	}

	static sucesso(texto: string, novaLinha = true) {
		terminal.green(`${novaLinha ? "\n" : ""} ${texto}`);
	}

	static erro(texto: string, novaLinha = true) {
		terminal.red(`${novaLinha ? "\n" : ""}${texto}`);
	}
}
