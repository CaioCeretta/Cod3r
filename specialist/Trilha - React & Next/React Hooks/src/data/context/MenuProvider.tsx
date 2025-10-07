/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useState } from "react";
import { secoes as s } from "../constants/secoesMenu";
import useBoolean from "../hooks/useBoolean";
import useTamanhoJanela from "../hooks/useTamanhoJanela";
import type { MenuSecao } from "../models/MenuSecao";

const ContextoMenu = createContext({} as any);

export function MenuProvider(props: any) {
  const [mini, toggleMini, miniTrue] = useBoolean();
  const [secoes, setSecoes] = useState<any>(s);

  const tamanho = useTamanhoJanela();

  const router = useRouter();

  //sm md
  useEffect(() => {
    if (tamanho === "md" || tamanho === "sm") {
      // set mini as true
      miniTrue();
    }
  }, [tamanho, miniTrue]);

  useEffect(() => {
    setSecoes(() => selecionarItem(router.asPath));
  }, [router.asPath]);

  function alternarSecao(secaoSelecionada: MenuSecao) {
    const novasSecoes = secoes.map((secao: any) => {
      if (secao.titulo === secaoSelecionada?.titulo) {
        return { ...secao, aberta: !secao.aberta }
      } else {
        return secao
      }
    });

    setSecoes(() => novasSecoes)
  }

  function selecionarItem(url: string) {
    const novasSecoes = secoes.map((secao: any) => {
      const novosItens = secao.itens.map((item: any) => {
        return { ...item, selecionado: item.url === url };
      });
      return { ...secao, itens: novosItens };
    });
    return novasSecoes;
  }

  const ctx = { secoes, mini, toggleMini, alternarSecao };

  return (
    <ContextoMenu.Provider value={ctx}>{props.children}</ContextoMenu.Provider>
  );
}

export default ContextoMenu;
