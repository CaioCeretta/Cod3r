import { useEffect, useState } from "react";

function getTamanhoJanela() {
	if (typeof window !== "undefined") {
		const { innerWidth: largura, innerHeight: altura } = window;

		return { largura, altura };
	} else {
		return { largura: -1, altura: -1 };
	}
}

export default function useTamanhoJanela() {
	const [tamanhoDaJanela, setTamanhoDaJanela] = useState(getTamanhoJanela());

	useEffect(() => {
		function tamanhoMudou() {
			setTamanhoDaJanela(getTamanhoJanela());
		}

		window.addEventListener("resize", tamanhoMudou);

		return () => {
			window.removeEventListener("resize", tamanhoMudou);
		};
	}, []);

	function entre(min: number, max: number) {
		return tamanhoDaJanela.largura >= min && tamanhoDaJanela.largura < max;
	}

	const dimensoes = {
		sm: entre(640, 768),
		md: entre(768, 1024),
		lg: entre(1024, 1280),
		xl: entre(1280, 1536),
		"2xl": entre(1536, Number.MAX_VALUE),
	};

	const tamanhoVerdadeiro = Object.entries(dimensoes).filter((el) => el[1]);

	return tamanhoVerdadeiro[0]?.[0];
}
