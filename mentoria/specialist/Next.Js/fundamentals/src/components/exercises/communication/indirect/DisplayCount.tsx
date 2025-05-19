export interface DisplayCountProps {
	number: number
	error: string
}

export const DisplayCount = ({
	number,
	error,
}: DisplayCountProps) => {
	return (
		<div className="text-8xl font-black w-28">
			<span>{number}</span>
			{error && (
				<span className="text-red-500">{error}</span>
			)}
		</div>
	)
}

export default DisplayCount
