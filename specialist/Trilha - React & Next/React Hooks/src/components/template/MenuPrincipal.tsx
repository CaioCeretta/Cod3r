import { IconMenu, IconX } from "@tabler/icons-react";
import useMenu from "@/data/hooks/useMenu";
import type { MenuItem } from "../../data/models/MenuItem";
import type { MenuSecao } from "../../data/models/MenuSecao";
import Flex from "./Flex";
import Logo from "./Logo";
import MenuPrincipalItem from "./MenuPrincipalItem";
import MenuPrincipalSecao from "./MenuPrincipalSecao";

export default function MenuPrincipal() {
    const { secoes, mini, toggleMini, miniTrue } = useMenu();

    function renderizarSecoes() {
        return secoes.map((secao: MenuSecao) => (
            <MenuPrincipalSecao
                key={secao.titulo}
                titulo={secao.titulo}
                mini={mini}
                aberta={secao.aberta}
            >
                {renderizarItens(secao)}
            </MenuPrincipalSecao>
        ));
    }

    function renderizarItens(secao: MenuSecao) {
        return secao.itens.map((item: MenuItem) => (
            <MenuPrincipalItem
                key={`${item.titulo}-${item.tag}`}
                icone={item.icone}
                titulo={item.titulo}
                tag={item.tag}
                url={item.url}
                mini={mini}
                selecionado={item.selecionado}
            />
        ));
    }

    return (
        <aside
            className={`
            flex flex-col overflow-y-scroll overflow-x-hidden
            bg-black shadow-md shadow-zinc-800
            scrollbar-thumb-zinc-700 scrollbar-track-zinc-800 
            scrollbar-thin
            ${mini ? "items-center w-[130px]" : "w-[370px]"}
        `}
        >
            <Flex center className="m-7">
                {!mini && <Logo />}
                {/* <button type="button" onClick={toggleMini}>
                    <div className="cursor-pointer">
                        {mini ? <IconMenu /> : <IconX />}
                    </div>
                </button> 
                
                or we can use just the button and remove the default stylings to look more like a div*/}
                <button
                    type="button"
                    onClick={toggleMini}
                    className="cursor-pointer bg-transparent border-none p-0 m-0"
                >
                    {mini ? <IconMenu /> : <IconX />}
                </button>
            </Flex>
            <nav className="flex flex-col gap-4 m-7">{renderizarSecoes()}</nav>
        </aside>
    );
}
