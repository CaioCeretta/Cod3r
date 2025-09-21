import { useState } from "react";
import InputFormatado from "@/components/template/InputFormatado";
import Pagina from "@/components/template/Pagina";
import useStateValidado from "@/data/hooks/useStateValidado";

export default () => {
  function validaSenha(senha: string) {
    /* This regex is not so good, since it accepts 8 or more characters, and they can be anything different from a white
    space, so it accepts even 12345678 */
    const correspondencia = senha.match(/[\d\S]{8,}/);

    return correspondencia?.[0].length === senha.length
  }

  const [senha, setSenha, senhaEhValida] = useStateValidado("", validaSenha);

  let borda: string;

  if (senha === '') {
    borda = 'border-none'
  } else if (senhaEhValida) {
    borda = 'border-green-500'
  } else if (!senhaEhValida) {
    borda = 'border-red-500'
  }

  return (
    <Pagina
      titulo="Validando senha"
      subtitulo="Usando um hook personalizado para validação"
    >
      <InputFormatado
        valor={senha}
        onInput={e => setSenha(e.target.value)}
        label="Senha"
        tipo="text"
        className={` ${borda} border-4 w-8 flex`}
      />
    </Pagina>
  );
};
