import { sum } from '../src'

test('It should sum two numbers', () => {
	const result = sum(2, 3)

	expect(result).toBe(5)
})
