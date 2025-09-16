import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";

export interface PaginaProps {
	children: React.ReactNode;
}

export default function Pagina(props: PaginaProps) {
	return (
		<div className="flex flex-col h-screen">
			<Cabecalho />
			<main className="flex-1 py-16 container">{props.children}</main>
			<Rodape />
		</div>
	);
}
