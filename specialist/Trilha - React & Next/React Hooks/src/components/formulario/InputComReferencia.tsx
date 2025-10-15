import type React from "react";
import { forwardRef, useId, useImperativeHandle, useRef } from "react";

/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
interface InputFormatadoProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    tipo: string;
    className?: string;
}

function InputComReferencia(
    props: InputFormatadoProps,
    ref: React.ForwardedRef<any>,
) {
    const id = useId();
    const referenciaInterna = useRef<any>();

    function novasFuncionalidades() {
        return {
            apagar: () => {
                referenciaInterna.current.value = referenciaInterna.current.value.slice(
                    0,
                    -1,
                );
            },

            textoPadrao: () => {
                referenciaInterna.current.value = "Padrão";
            },
        };
    }

    useImperativeHandle(ref, novasFuncionalidades);

    return (
        <>
            <label htmlFor={id} className="m-1">
                {props.label}
            </label>
            <input
                id={id}
                ref={referenciaInterna}
                type={props.tipo}
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
