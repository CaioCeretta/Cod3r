import type { ReactNode } from "react"
import clsx from "clsx"

export interface CardProps {
  children?: ReactNode
  color: 'primary' | 'secondary' | 'dark' | 'light'
  noBorder: boolean 
  hover?: boolean
}

export const Card = ({ children, color, noBorder, hover }: CardProps) => {

  console.log(color)
  
  return (
    <article className="flex justify-center items-center"> 
      <div
        className={clsx(
          'rounded-xl',
          {
            'bg-primary-600': color === 'primary',
            'bg-secondary-600': color === 'secondary',
            'bg-dark-600': color === 'dark',
            'bg-light-600': color === 'light',
            'hover:shadow-lg transition-shadow': hover,
          }
        )}
      >
        <div className={clsx('rounded-xl', { 'mb-2': !noBorder })}>
          <div
            className={clsx(
              'rounded-xl p-2 overflow-auto',
              {
                'bg-primary-500': color === 'primary',
                'bg-secondary-500': color === 'secondary',
                'bg-dark-500': color === 'dark',
                'bg-light-500': color === 'light',
              }
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </article> 
  )
}

export default Card
