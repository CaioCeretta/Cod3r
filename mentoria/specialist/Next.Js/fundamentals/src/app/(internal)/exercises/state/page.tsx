'use client'

import Display from '@/components/exercises/state/Display'
import Title from '@/components/template/Title'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useState } from 'react'

export const Page = () => {
	const [number, setNumber] = useState<number>(0)

	function increment() {
		return setNumber((prev) => prev + 1)
	}

	function decrement() {
		return setNumber((prev) => prev - 1)
	}

	return (
		<div className="flex flex-col gap-5">
			<Title
				main="State Handling"
				secondary="State within a component"
			/>
			<div className="flex items-center gap-5">
				<Display value={number} />
				<button
					className=" bg-blue-500 p-2 rounded-md cursor-pointer"
					onClick={increment}
				>
					Add <IconPlus />
				</button>

				<button
					className=" bg-green-500 p-2 rounded-md cursor-pointer"
					onClick={decrement}
				>
					Minus <IconMinus />
				</button>
			</div>
		</div>
	)
}

export default Page
