import Child from './Child'

export interface ParentProps {
	name: string
	surname: string
}

export default function Parent(props: ParentProps) {
	const { name, surname } = props

	return (
		<div className="flex flex-col gap-3 border p-2">
			<div className="flex gap-2">
				<h1 className="text-4xl">{name}</h1>
				<h2 className="text-4xl">{surname}</h2>
			</div>
			<ul>
				<ul>
					<Child name="Caio" surname={surname} />
					<Child name="Alex" surname={surname} />
					<Child name="André" surname={surname} />
				</ul>
			</ul>
		</div>
	)
}
