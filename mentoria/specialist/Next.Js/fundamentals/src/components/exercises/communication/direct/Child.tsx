export interface ChildProps {
	name: string
	surname: string
}

export const Child = (props: ChildProps) => {
	const { name, surname } = props

	return (
		<li className="text-3xl">
			{name} {surname}
		</li>
	)
}

export default Child
