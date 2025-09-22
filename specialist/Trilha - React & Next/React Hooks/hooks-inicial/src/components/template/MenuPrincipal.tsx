import {
    IconAppWindow,
    IconArrowsLeftRight,
    IconDimensions,
    IconLetterCase,
    IconLock,
    IconMathGreater,
    IconMenu,
    IconMinus,
    IconNumbers,
    IconRefreshAlert,
    IconSettings,
    IconUsers,
    IconX,
} from "@tabler/icons-react";
import useToggle from "@/data/hooks/useToggle";
import type { MenuItem } from "../../data/models/MenuItem";
import type { MenuSecao } from "../../data/models/MenuSecao";
import Flex from "./Flex";
import Logo from "./Logo";
import MenuPrincipalItem from "./MenuPrincipalItem";
import MenuPrincipalSecao from "./MenuPrincipalSecao";

export default function MenuPrincipal() {
    const secoes = [
        {
            titulo: "Essenciais",
            aberta: false,
            itens: [
                {
                    titulo: "Contador",
                    url: "/essenciais/contador",
                    tag: "useState",
                    icone: <IconNumbers />,
                },
                {
                    titulo: "Votação",
                    url: "/essenciais/votacao",
                    tag: "useState",
                    icone: <IconUsers />,
                },
                {
                    titulo: "Consulta API",
                    url: "/essenciais/consultaAPI",
                    tag: "useEffect",
                    icone: <IconArrowsLeftRight />,
                },
                {
                    titulo: "Maior",
                    url: "/essenciais/maior",
                    tag: "useEffect",
                    icone: <IconMathGreater />,
                },
                {
                    titulo: "Contagem Caracteres",
                    url: "/essenciais/contagemCaracteresEffect",
                    tag: "useEffect",
                    icone: <IconLetterCase />,
                },
                {
                    titulo: "State VS Referência",
                    url: "/essenciais/stateVSRef",
                    tag: "useRef",
                    icone: <IconRefreshAlert />,
                },
                {
                    titulo: "Referenciando Elemento",
                    url: "/essenciais/refElemento",
                    tag: "useRef",
                    icone: <IconSettings />,
                },
                {
                    titulo: "Contagem Caracteres",
                    url: "/essenciais/contagemCaracteresRef",
                    tag: "useRef",
                    icone: <IconLetterCase />,
                },
            ],
        },
        {
            titulo: "Personalizados",
            aberta: true,
            itens: [
                {
                    titulo: "Modal",
                    url: "/personalizados/modal",
                    tag: "Customs (useToggle)",
                    icone: <IconAppWindow />,
                },
                {
                    titulo: "Tamanho Janela",
                    url: "/personalizados/tamanhoJanela",
                    tag: "Customs",
                    icone: <IconDimensions />,
                },
                {
                    titulo: "Validando Senha",
                    url: "/personalizados/senha",
                    tag: "Personalizados",
                    icone: <IconLock />,
                },
            ],
        },
    ];
    const [mini, toggleMini] = useToggle(false);

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
                <div className="cursor-pointer" onClick={toggleMini}>
                    {mini ? <IconMenu /> : <IconX />}
                </div>
            </Flex>
            <nav className="flex flex-col gap-4 m-7">{renderizarSecoes()}</nav>
        </aside>
    );
}
