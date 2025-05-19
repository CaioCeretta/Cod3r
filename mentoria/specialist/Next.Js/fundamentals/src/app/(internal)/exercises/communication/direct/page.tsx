import Parent from '@/components/exercises/communication/direct/Parent'
import Title from '@/components/template/Title'

export const Page = () => {
	return (
		<div className="flex flex-col gap-5">
			<Title
				main="Direct Communication"
				secondary="How it works in practice"
			/>

			<div className="flex gap-2">
				<Parent name="José" surname="Soares" />
				<Parent name="Regina" surname="Ceretta" />
			</div>
		</div>
	)
}

export default Page
