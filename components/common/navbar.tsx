"use client";

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/navbar";
import { Avatar } from "@nextui-org/react";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";

import { ThemeSwitch } from "@/components/common/theme-switch";
import {
	SearchIcon,
	MenuIcon,
	Logo
} from "@/components/common/icons";
import { useMenuDispatch, useMenu } from "@/context/MenuContext";

export const Navbar = () => {

	const menuState = useMenu()
	const dispatch = useMenuDispatch()

	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					Enter
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	return (
		<NextUINavbar maxWidth="full" position="sticky" className="h-14" shouldHideOnScroll>
			<NavbarContent className="flex basis-1/2 ml-4"
				justify="start"
			>
				<MenuIcon onClick={() => {
					dispatch({ type: 'changed', state: !menuState })
				}} />
				<Logo />
			</NavbarContent>

			<NavbarContent className="flex basis-full"
				justify="center"
			>
				<NavbarItem className="basis-1/2 hidden md:flex">{searchInput}</NavbarItem>
			</NavbarContent>

			<NavbarContent
				className="flex basis-full"
				justify="end"
			>
				<NavbarItem className="flex basis-full gap-2">
					<ThemeSwitch />
					<Avatar name="john"></Avatar>
				</NavbarItem>
			</NavbarContent>
		</NextUINavbar>
	);
};
