import Pagina from "@/components/shared/Pagina";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Pagina>{children}</Pagina>;
}
