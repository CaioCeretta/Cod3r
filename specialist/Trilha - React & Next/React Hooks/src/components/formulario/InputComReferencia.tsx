import type React from "react";
import { forwardRef, useId } from "react";

/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
interface InputFormatadoProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    tipo: string;
    valor: string | number;
    className?: string;
}

function InputComReferencia(props: InputFormatadoProps, ref: React.ForwardedRef<HTMLInputElement>) {
    const id = useId();

    return (
        <>
            <label htmlFor={id} className="m-1">
                {props.label}
            </label>
            <input
                id={id}
                ref={ref}
                type={props.tipo}
                value={props.valor}
                onInput={props.onInput}
                className={`
                    text-gray-600 px-2 
                    w-40 h-11 rounded-md
                    ${props.className ?? ""}
                `}
            />
        </>
    );
}

export default forwardRef(InputComReferencia);
