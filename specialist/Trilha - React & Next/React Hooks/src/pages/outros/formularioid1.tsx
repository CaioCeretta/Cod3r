import { useId } from "react";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";

export default function () {
  const id = useId()

  return (
    <Pagina
      titulo="Conhecendo o hook useId"
      subtitulo="Usando useId em um formulario"
    >
      <Flex center col>
        <Flex center>
          <label className="m-1 " htmlFor={`nome-${id}`}>
            Nome
          </label>
          <input id={`nome-${id}`} className="m-2 text-gray-600 p-2 rounded-md" type="text" />
        </Flex>
        <Flex center>
          <label className="m-1 " htmlFor={`sobrenome-${id}`}>
            Sobrenome
          </label>
          <input id={`sobrenome-${id}`} className="m-2 rounded-md text-gray-600 p-2" type="text" />
        </Flex>
      </Flex>
    </Pagina>
  );
}
