import { IconMinus, IconPlus } from "@tabler/icons-react";
import Flex from "./Flex";

interface MenuSecaoProps {
    titulo: string;
    mini: boolean;
    aberta: boolean;
    children: any;
    onClick?: () => void;
}

export default function MenuSecao(props: MenuSecaoProps) {
    const { titulo, mini, aberta } = props;

    // CSS classes on separate variable
    const buttonClasses = `
        flex items-center justify-between
        text-zinc-400 uppercase font-bold 
        ${mini && "text-[11px]"} cursor-pointer
        w-full text-left // Importante para o botão preencher o espaço e alinhar o texto
    `;

    return (
        <Flex col gap={4} className={`${mini && "items-center"}`}>
            {/* 1. Button for the clickable area */}
            <button
                type="button"
                className={buttonClasses}
                onClick={props.onClick} // onClick on the outer button
                aria-expanded={aberta} // Acessibility property to describe that the button is expanded
            >
                {/* 2. Button content, title and icon */}
                {mini ? (
                    titulo
                ) : (
                    <>
                        {/* Title */}
                        <span>{titulo}</span>

                        {/* Icon as visual part of the button */}
                        {aberta ? <IconMinus size={15} /> : <IconPlus size={15} />}
                    </>
                )}
            </button>

            {/* Rest of content */}
            {aberta && (
                <Flex col gap={1.5}>
                    {props.children}
                </Flex>
            )}
        </Flex>
    );
}