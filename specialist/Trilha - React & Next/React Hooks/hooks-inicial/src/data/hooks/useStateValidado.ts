import { useState } from "react";

export default function useStateValidado(
	valorInicial: any,
	funcaoValidacao: (e: any) => boolean,
) {
	const [valor, setValor] = useState(valorInicial);
	const [validado, setValidado] = useState(false);

	function setValorValidado(novoValor: any) {
		setValor(valor);
		setValidado(funcaoValidacao(novoValor));
	}

	return [valor, validado, setValorValidado];
}
