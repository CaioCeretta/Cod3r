import Counter from '@/components/exercises/communication/indirect/Counter'
import Title from '@/components/template/Title'

export const Page = () => {
	return (
		<div className="flex flex-col gap-2">
			<Title
				main="Indirect Communication"
				secondary="How it works in practice"
			></Title>
			<Counter />
		</div>
	)
}

export default Page
