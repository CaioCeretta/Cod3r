import React from 'react'

/* Or it can be React.HTMLProps<HTMLInputElement>

When we create an input field, inside react, is ideal that we do not supress the properties of an input
*/
export interface CamposEntradaProps extends React.InputHTMLAttributes<HTMLInputElement>{
  label: string;
  value: string | number;
  descricao?: string
  observacao?: string
  erro?: string

  onChange: (event: any) => void

}

export default function CampoEntrada(props: CamposEntradaProps) {
  return (
    <div className='flex flex-col gap-2 '>
      {/*
        At first glance, it might look a little unnecessary the creation of another div with similar stylings but there
        are some key reasons

        1. Organization

        . This second div is used to group related elements, such as label and descrição. This separation makes the code
        more readable and organized, as well as easier to maintain
        . Without it, all the elements, label; descricao; input; erro; observacao, would be at the same level, which can
        hinder understanding of the layout, specially in complex components

        2. Styling Control

        - If in the future, we find the necessity of applying different and specific styles, just for this group, the second
        div will allow us to do it

        3. Maintenance and Stability

        - If we have the need to add more elements related to the label and descricao, such as an icon or a tooltip, we
        already have a separated group.

        4. Avoid inheritance of conflicts

        - The use of flex in the external div can impact elements like input, erro and obscervação, that may not need this
        disposition
        - By encapsulating these two fields in a div, we isolate the application from the flex flex-col for these two specific
        elements



      */}
      <div className='flex flex-col'>
      {props.label && <label>{props.label}</label>}
      {props.descricao && <p>{props.descricao}</p>}
      </div>
      
      <input {...props} type={props.type ?? "text"}
        className='w-full px-3 py-2 border rounded '
      />
      {props.erro && (
        <span className='pl-2 text-sm text-red-500'>
          {props.erro}
        </span>
      )}

      {props.observacao && (
        <span className='text-xs pl-2 text-yellow-300'>{props.observacao}</span>
      )}


    </div>
  )
}