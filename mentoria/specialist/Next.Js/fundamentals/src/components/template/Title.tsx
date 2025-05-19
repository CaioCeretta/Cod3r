export interface TitleProps {
	main: string
	secondary?: string
}

export const Title = (props: TitleProps) => {
	const { main, secondary } = props

	return (
		<>
			<div className="flex flex-col">
				<h1 className="text-3xl font-black">{main}</h1>
				<h2 className="text-sm text-zinc-400">
					{secondary ?? ''}
				</h2>
			</div>
		</>
	)
}

export default Title
