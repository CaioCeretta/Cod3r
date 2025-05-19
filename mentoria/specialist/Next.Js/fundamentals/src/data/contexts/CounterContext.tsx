'use client'

import { createContext, useState } from 'react'

interface CounterContextProps {
	number: number
	increment: () => void
	decrement: () => void
}

const CounterContext = createContext<CounterContextProps>(
	{} as any
)

export function CounterProvider(props: any) {
	const [number, setNumber] = useState<number>(778899)

	function increment() {
		setNumber(number + 1)
	}

	function decrement() {
		setNumber(number - 1)
	}

	return (
		<CounterContext.Provider
			value={{ number, increment, decrement }}
		>
			<h1>Counter Provider</h1>
			{props.children}
		</CounterContext.Provider>
	)
}

export default CounterContext
