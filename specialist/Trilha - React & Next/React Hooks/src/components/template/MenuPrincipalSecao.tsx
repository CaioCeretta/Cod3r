/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import { IconMinus, IconPlus } from "@tabler/icons-react";
import useBoolean from "@/data/hooks/useBoolean";
import useToggle from "@/data/hooks/useToggle";
import Flex from "./Flex";

interface MenuSecaoProps {
    titulo: string;
    mini: boolean;
    aberta: boolean;
    children: any;
    onClick?: () => void;
}

export default function MenuSecao(props: MenuSecaoProps) {
    const { titulo, mini } = props;
    const [aberta, toggleAberta] = useToggle(props.aberta);

    return (
        <Flex col gap={4} className={`${mini && "items-center"}`}>
            <div
                className={`
                flex items-center justify-between
                text-zinc-400 uppercase font-bold 
                ${mini && "text-[11px]"} cursor-pointer
            `}
            >
                {mini ? (
                    titulo
                ) : (
                    <>
                        {titulo}
                        <button onClick={toggleAberta} type="button">
                            {aberta ? <IconMinus size={15} /> : <IconPlus size={15} />}
                        </button>
                    </>
                )}
            </div>
            {aberta && (
                <Flex col gap={1.5}>
                    {props.children}
                </Flex>
            )}
        </Flex>
    );
}
