import { useId } from "react";
import InputComId from "@/components/formulario/InputComId";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";

export default function () {
  const id = useId();

  return (
    <Pagina
      titulo="Usando o hook useId em um componente"
      subtitulo="Reusando um componente com useId"
    >
      <Flex center>
        <InputComId label={"nome"} />
        <InputComId label={"sobrenome"} />
      </Flex>
    </Pagina>
  );
}
