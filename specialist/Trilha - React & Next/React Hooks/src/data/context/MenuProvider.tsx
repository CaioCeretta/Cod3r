import { createContext, useEffect } from "react";
import useBoolean from "../hooks/useBoolean";
import useTamanhoJanela from "../hooks/useTamanhoJanela";

const ContextoMenu = createContext({} as any);


export function MenuProvider(props: any) {

  const [mini, toggleMini, miniTrue, miniFalse] = useBoolean();

  const tamanho = useTamanhoJanela();

  //sm md
  useEffect(() => {
    if (tamanho === "md" || tamanho === "sm") {
      // set mini as true
      miniTrue();
    } else {
      miniFalse();
    }
  }, [tamanho, miniTrue, miniFalse]);

  return (
    <ContextoMenu.Provider value={{ secoes }}>
      {props.children}
    </ContextoMenu.Provider>
  );
}

export default ContextoMenu;
