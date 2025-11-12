import type RegiaoCpf from "../shared/RegiaoCpf";
import type Pessoa from "./Pessoa";

export default class PessoasPorRegiao {
	constructor(private pessoas: Pessoa[]) {}

	agrupar(): Map<RegiaoCpf, Pessoa[]> {
		return this.pessoas.reduce((map, pessoa) => {
			const regiao = pessoa.cpf.regiao;
			const pessoasDaRegiao = map.get(regiao) ?? [];
			pessoasDaRegiao.push(pessoa);

			map.set(regiao, pessoasDaRegiao);

			return map;
		}, new Map<RegiaoCpf, Pessoa[]>());
	}
}
