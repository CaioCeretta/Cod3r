import { createContext, useEffect } from "react";
import secoes from "../constants/secoesMenu";
import useBoolean from "../hooks/useBoolean";
import useTamanhoJanela from "../hooks/useTamanhoJanela";

const ContextoMenu = createContext({} as any);

export function MenuProvider(props: any) {
  const [mini, toggleMini, miniTrue] = useBoolean();

  const tamanho = useTamanhoJanela();

  //sm md
  useEffect(() => {
    if (tamanho === "md" || tamanho === "sm") {
      // set mini as true
      miniTrue();
    }
  }, [tamanho, miniTrue]);

  const ctx = { secoes, mini, toggleMini }

  return (
    <ContextoMenu.Provider value={ctx}>
      {props.children}
    </ContextoMenu.Provider>
  );
}

export default ContextoMenu;
