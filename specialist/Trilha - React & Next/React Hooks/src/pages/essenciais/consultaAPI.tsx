import { useEffect, useState } from "react";
import Pagina from "@/components/template/Pagina";

export default function () {
	// With empty state the value will be undefined
	const [url, setUrl] = useState();

	/* 
	Our component is a function which is making an API request to an external domain, which makes this function an
	impure one, and this call is called a collateral effect because it has nothing to do with the rendering of our
	project, or with an user input, but the fetch

	The state changing, causes our component to re-render, because inside react a component is rendered again every
	time the state or a property received by parameter change.

	If we let the code like this, without a useEffect and create a dependency, we will be able to see that it keep
	running and running, since when the state changes, the component renders again. If we don't wrap it in an useEffect
	and don't say when to stop or to execute once, it run over and over again

	*/


	/* With an empty dependency array, this fetch happens only once*/
	useEffect(() => {
		fetch("https://dog.ceo/api/breeds/image/random")
			.then((data) => data.json())
			.then((obj) => {
				setUrl(obj.message)
			});
	}, [])

	return (
		<Pagina titulo="Requisição à API" subtitulo="Requerindo dados">
			<img className="max-w-sm" src={url} alt={url} />
		</Pagina>
	);
}
