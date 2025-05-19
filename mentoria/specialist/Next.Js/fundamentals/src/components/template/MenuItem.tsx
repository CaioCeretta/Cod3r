import Link from 'next/link'

export interface MenuItemProps {
	url: string
	icon: React.ReactNode
	text: string
	className?: string
}

export const MenuItem = ({
	url,
	icon,
	text,
	className,
}: MenuItemProps) => {
	return (
		<Link href={url}>
			<div
				className={`${
					className ?? ''
				} flex items-center gap-2 hover:bg-black p-2 rounded-md`}
			>
				{icon}
				<span>{text}</span>
			</div>
		</Link>
	)
}

export default MenuItem
