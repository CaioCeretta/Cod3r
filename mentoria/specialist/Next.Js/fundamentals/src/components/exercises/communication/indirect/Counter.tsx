'use client'

import { useState } from 'react'
import DisplayCount from './DisplayCount'
import { Buttons } from './Buttons'

export const Counter = () => {
	const [number, setNumber] = useState(0)
	const [errors, setErrors] = useState('')

	function increment() {
		if (number >= 99) {
			setErrors("The quantity can't be over 99")
			return
		}
		setErrors('')
		setNumber((prev) => {
			return prev + 1
		})
	}

	function decrement() {
		if (number <= 0) {
			setErrors("The quantity can't be below 0")
			return
		}
		setErrors('')
		setNumber((prev) => {
			return prev - 1
		})
	}

	return (
		<div className="flex items-center gap-4">
			<DisplayCount error={errors} number={number} />
			<Buttons
				increment={increment}
				decrement={decrement}
			/>
		</div>
	)
}

export default Counter
