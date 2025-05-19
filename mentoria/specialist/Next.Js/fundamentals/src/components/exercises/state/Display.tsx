export interface DisplayProps {
	value: number
}

export const Display = ({ value }: DisplayProps) => {
	return <span className="text-8xl">{value}</span>
}

export default Display
