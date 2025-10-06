import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useState } from "react";
import { secoes as s } from "../constants/secoesMenu";
import useBoolean from "../hooks/useBoolean";
import useTamanhoJanela from "../hooks/useTamanhoJanela";

const ContextoMenu = createContext({} as any);

export function MenuProvider(props: any) {
  const [mini, toggleMini, miniTrue] = useBoolean();
  const [secoes, setSecoes] = useState<any>(s)

  const tamanho = useTamanhoJanela();

  const router = useRouter();

  //sm md
  useEffect(() => {
    if (tamanho === "md" || tamanho === "sm") {
      // set mini as true
      miniTrue();
    }
  }, [tamanho, miniTrue]);



  const selecionarItem = useCallback((url: string) => {
    const novasSecoes = secoes.map((secao: any) => {
      const novosItens = secao.itens.map((item: any) => {
        return {
          ...item,
          selecionado: item.url === url,
        };
      });

      return novosItens;
    });

    return novasSecoes;
  }, [secoes])

  useEffect(() => {
    setSecoes(() => selecionarItem(router.asPath))
  }, [selecionarItem, router.asPath])


  const ctx = { secoes, mini, toggleMini };

  return (
    <ContextoMenu.Provider value={ctx}>{props.children}</ContextoMenu.Provider>
  );
}

export default ContextoMenu;
