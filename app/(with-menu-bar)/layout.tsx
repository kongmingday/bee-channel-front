/*
 * @Author: err0r
 * @Date: 2023-09-23 23:02:35
 * @LastEditors: err0r
 * @LastEditTime: 2023-11-01 16:27:34
 * @Description: 
 * @FilePath: \bee-channel-front\app\(with-menu-bar)\layout.tsx
 */
import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { Providers } from "../providers";
import { Navbar } from "@/components/common/navbar";
import { Metadata } from "next";
import clsx from "clsx";
import { RouterJudge } from "./routerJudge";
import Head from "next/head";

export const metadata: Metadata = {
	title: {
		template: '%s bee-channel',
		default: 'bee-channel', // a default is required when creating a template
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<html lang="en" suppressHydrationWarning>
			<Head>{ }</Head>
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<RouterJudge>
							{children}
						</RouterJudge>
					</div>
				</Providers>
			</body>
		</html >
	);
}
