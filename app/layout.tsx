"use client";

import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/common/navbar";
import { CommonMenu } from "@/components/common/menu";

import { MenuProvider } from "@/context/MenuContext";
import clsx from "clsx";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<MenuProvider>
							<Navbar />
							<CommonMenu isFixed={true} />
						</MenuProvider>
						<main className="w-full lg:pl-64 p-4 flex-grow">
							{children}
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
