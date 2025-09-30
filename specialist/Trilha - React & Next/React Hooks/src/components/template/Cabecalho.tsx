import { IconPaint, IconX } from "@tabler/icons-react";
import useToggle from "@/data/hooks/useToggle";
import Flex from "./Flex";
import SeletorDeCor from "./SeletorDeCor";
import Titulo from "./Titulo";

interface CabecalhoProps {
    titulo?: string;
    subtitulo?: string;
}

export default function Cabecalho(props: CabecalhoProps) {
    const [mostraSeletor, toggleMostraSeletor] = useToggle(false);

    return (
        <Flex centerCross className="justify-between">
            {props.titulo ? (
                <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
            ) : (
                <div></div>
            )}
            <div>
                <button onClick={toggleMostraSeletor} type="button">
                    {mostraSeletor ? <IconX /> : <IconPaint />}
                </button>
            </div>
            {mostraSeletor ? <SeletorDeCor></SeletorDeCor> : ""}
        </Flex>
    );
}
