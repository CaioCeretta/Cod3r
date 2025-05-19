'use client'

import Title from '@/components/template/Title'
import CounterContext from '@/data/contexts/CounterContext'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useContext } from 'react'

export interface PageProps {}

export const Page = (props: PageProps) => {
	const { number, increment, decrement } =
		useContext(CounterContext)

	return (
		<div className="flex flex-col gap-5">
			<Title
				main="Using Context"
				secondary="Using React.JS Context API"
			/>
			<div className="text-8xl">{number}</div>
			<div className="flex items-center justify-between">
				<button
					onClick={decrement}
					className="bg-red-500 px-4 py-2 rounded-md"
				>
					<IconMinus />
				</button>
				<button
					onClick={increment}
					className="bg-blue-500 px-4 py-2 rounded-md"
				>
					<IconPlus />
				</button>
			</div>
		</div>
	)
}

export default Page
