import { useLayoutEffect, useState } from "react";
import Botao from "@/components/template/Botao";
import Display from "@/components/template/Display";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";

export default function () {
  const [randomColor, setRandomColor] = useState("");
  const [texto, setTexto] = useState("Clique em sortear")

  /*
      ■ The challenge will consist of
        □ 1 - Showing the div conditionally, and we want the div to show when we click on the button 'Sortear cor' and vanish
        when the button 'Apagar cor' is clicked
        □ 2 - Display a text in the Display tag, saying any of these two options
          - Clique em sortear
          - Mostre uma cor aleatória
        □ 3 - Alter the div color according to the random color defined by the function
  */

  useLayoutEffect(() => {
    const possibleTexts = ['Clique em sortear', 'Mostre uma cor aleatória']
    const indice = Math.floor(Math.random() * possibleTexts.length)

    return setTexto(possibleTexts[indice])
  }, [])

  function geraCorAleatoria() {
    const numeroAleatorioHexadecimal = Math.floor(Math.random() * 0xffffff);
    const corHex = `#${numeroAleatorioHexadecimal.toString(16).padStart(6, "0")}`;

    setRandomColor(corHex);
  }

  function resetaCor() {
    setRandomColor('')
  }

  return (
    <Pagina
      titulo="Gerador de Cor"
      subtitulo="Criando exemplos mais complexos com useLayoutEffect"
    >
      <Flex>
        <Botao texto="Sortear Cor" onClick={geraCorAleatoria} />
        <Botao texto="Apagar Cor" onClick={resetaCor} />
      </Flex>
      <Display texto={texto} />
      {randomColor ? (
        <div style={{ backgroundColor: randomColor }} className="w-32 h-32 rounded-md"></div>
      ) : (
        ""
      )}
    </Pagina >
  );
}
