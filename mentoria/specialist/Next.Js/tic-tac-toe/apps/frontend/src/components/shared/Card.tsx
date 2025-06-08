import type { ReactNode } from "react"
import clsx from "clsx"

export interface CardProps {
  children?: ReactNode
  color: 'primary' | 'secondary' | 'dark' | 'light'
  noBorder?: boolean 
  hover?: boolean
}

const baseColor = {
    primary: 'bg-primary-500',
    secondary:'bg-secondary-500',
    dark: 'bg-dark-500',
    light: 'bg-light-500'
}

const hoverColor = {
    primary: 'bg-primary-600',
    secondary:'bg-secondary-600',
    dark: 'bg-dark-600',
    light: 'bg-light-600'
}

export const Card = ({ children, color, noBorder, hover }: CardProps) => {
  
  return (
    <div className="flex justify-center items-center"> 
      <div
        className={clsx(
          'rounded-xl', 
          baseColor[color],
        )}
      >
        <div className={clsx('rounded-xl', { 'mb-2': !noBorder })}>
          <div
            className={clsx(
              'rounded-xl p-2 overflow-auto',
              baseColor[color],
              hover && hoverColor[color]
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div> 
  )
}

export default Card
