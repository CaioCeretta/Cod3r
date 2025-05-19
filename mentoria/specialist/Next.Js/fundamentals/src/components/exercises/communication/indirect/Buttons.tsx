import { IconMinus, IconPlus } from '@tabler/icons-react'

export interface ButtonsProps {
	increment: () => void
	decrement: () => void
}

export const Buttons = ({
	increment,
	decrement,
}: ButtonsProps) => {
	return (
		<div className="flex flex-col gap-2">
			<button
				className="bg-blue-500 p-2 rounded-md cursor-pointer"
				onClick={increment}
			>
				<IconPlus />
			</button>
			<button
				className="bg-red-500 p-2 rounded-md cursor-pointer"
				onClick={decrement}
			>
				<IconMinus />
			</button>
		</div>
	)
}
