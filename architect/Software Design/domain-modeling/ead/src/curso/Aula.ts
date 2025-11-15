import { Erros } from "@/constants/Erros";
import ErroValidacao from "@/error/ErroValidacao";
import Duracao from "@/shared/Duracao";
import type { EntidadeProps } from "@/shared/Entidade";
import Entidade from "@/shared/Entidade";
import NomeSimples from "@/shared/NomeSimples";
import Ordem from "@/shared/Ordem";
import Url from "@/shared/Url";

export interface AulaProps extends EntidadeProps {
	nome?: string;
	duracao?: number;
	videoUrl?: string;
	ordem?: number;
}

export default class Aula extends Entidade<Aula, AulaProps> {
	readonly nome: NomeSimples;
	readonly duracao: Duracao;
	readonly videoUrl: Url;
	readonly ordem: Ordem;

	constructor(props: AulaProps) {
		super({ ...props, ordem: props.ordem ?? 1 });

		this.nome = new NomeSimples(props.nome!, 3, 50);
		this.duracao = new Duracao(props.duracao);
		this.videoUrl = new Url(props.videoUrl);
		this.ordem = new Ordem(props.ordem);

		if (this.duracao.zerada) {
			ErroValidacao.lancar(Erros.AULA_DURACAO_ZERADA);
		}
	}
}
