/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
interface InputFormatadoProps {
    label?: string;
    tipo: string;
    valor: string | number;
    semLabel: boolean;
    onInput?: (e: any) => any;
    onChange?: (e: any) => any;
    className?: string
}

export default function InputFormatadoSemLabel(props: InputFormatadoProps) {
    return (
        <>
            <label className={` ${props.semLabel ? 'hidden' : 'inline'} m-1`}>{props.label}</label>
            <input
                type={props.tipo}
                value={props.valor}
                onInput={props.onInput}
                onChange={props.onChange}
                className={`
                    text-gray-600 px-2 
                    w-40 h-11 rounded-md
                    ${props.className ?? ''}
                `}
            />
        </>
    );
}
