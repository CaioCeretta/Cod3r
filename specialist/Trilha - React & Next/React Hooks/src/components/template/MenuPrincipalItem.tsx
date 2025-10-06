import { IconCode } from "@tabler/icons-react";
import Link from "next/link";
import type { ReactElement } from "react";
import useTema from "@/data/hooks/useTema";

interface MenuItemProps {
    icone?: ReactElement;
    titulo: string;
    tag?: string;
    url: string;
    mini?: boolean;
    selecionado?: boolean | undefined
}

export default function MenuItem(props: MenuItemProps) {
    const { corDestaque } = useTema();

    const { icone, titulo, tag, url, mini } = props;

    return (
        <Link
            id={titulo}
            href={url}
            className={`
            flex items-center gap-2 text-zinc-400 rounded-md
            hover:bg-zinc-800 px-3 py-2
            ${ativo && `text-${corDestaque}-500 bg-zinc-900`}
        `}
        >
            {icone ?? <IconCode />}
            {!mini && titulo}
            {!mini && tag && (
                <span
                    className={`
                    ${ativo ? `bg-${corDestaque}-500` : "bg-zinc-700"}
                    text-white text-[11px] rounded-full px-2
                `}
                >
                    {tag}
                </span>
            )}
        </Link>
    );
}
