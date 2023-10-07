"use client";

import { useState, useRef, useEffect } from "react";
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Avatar } from "@nextui-org/react";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";

import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";

export const Navbar = () => {
	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					K
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
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<NextUINavbar maxWidth="full" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				/>
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="flex basis-full"
				justify="center"
			>
				<NavbarItem className="flex basis-1/2">{searchInput}</NavbarItem>
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
