import {
	IconArrowDownCircle,
	IconArrowUpCircle,
	IconDatabase,
	IconLayoutDashboard,
	IconLogout,
	IconSettings,
	IconStack,
	IconUser,
} from '@tabler/icons-react'
import MenuItem from './MenuItem'

export default function Menu() {
	return (
		<nav className="flex flex-col gap-2 p-7">
			<MenuItem
				url="/start"
				icon={<IconLayoutDashboard />}
				text="Dashboard"
			/>
			<MenuItem
				url="start/admin"
				icon={<IconUser />}
				text="Users"
			/>
			<MenuItem
				url="/exercises/communication/direct"
				icon={<IconArrowDownCircle />}
				text="Direct Communication"
			/>

			<MenuItem
				url="/exercises/communication/indirect"
				icon={<IconArrowUpCircle />}
				text="Indirect Communication"
			/>

			<MenuItem
				url="/exercises/state"
				icon={<IconDatabase />}
				text="State Handling"
			/>

			<MenuItem
				url="/exercises/context"
				icon={<IconStack />}
				text="Using contexts"
			/>

			<MenuItem
				url="settings"
				icon={<IconSettings />}
				text="Settings"
			/>
			<MenuItem
				url="/"
				icon={<IconLogout />}
				text="Log Out"
			/>
		</nav>
	)
}
