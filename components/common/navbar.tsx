/*
 * @Author: err0r
 * @Date: 2023-09-23 23:02:35
 * @LastEditors: err0r
 * @LastEditTime: 2023-11-01 21:14:45
 * @Description: 
 * @FilePath: \bee-channel-front\components\common\navbar.tsx
 */
"use client";
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/navbar";
import {
	Avatar, Button,
	Card, Tooltip,
	Listbox, ListboxItem, User
} from "@nextui-org/react";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ThemeSwitch } from "@/components/common/theme-switch";
import {
	SearchIcon,
	MenuIcon,
	Logo,
	SignOutIcon,
	UserIcon,
	UploadIcon,
	ChevronRightIcon
} from "@/components/common/icons";
import { changeOpenState } from "@/store/slices/menuSlice";
import { useRouter } from "next/navigation";
import { getAuthInfo, removeAuthToken } from "@/utils/common/tokenUtils";

const StoreFileHost = process.env.NEXT_PUBLIC_STORE_FILE_HOST

export const Navbar = () => {

	const router = useRouter()
	const menu = useAppSelector(state => state.menu)
	const dispatch = useAppDispatch()

	const authInfo = getAuthInfo()

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
		<NextUINavbar maxWidth="full" className="z-20 h-14 bg-white dark:bg-[#18181B] shadow-sm">
			<NavbarContent className="flex basis-1/2 ml-4"
				justify="start"
			>
				<MenuIcon onClick={() => {
					dispatch(changeOpenState(!menu.isOpen))
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
					<ThemeSwitch className="mr-4" />
					{
						authInfo ?
							<Tooltip
								placement="left-end"
								className="px-0 dark:shadow-white-sm"
								content={
									<>
										<Card className="w-full shadow-none p-2 m-3 cursor-default">
											<User
												classNames={{
													name: 'text-lg'
												}}
												name={authInfo.information?.username}
												avatarProps={{
													src: `${StoreFileHost}${authInfo.information?.profile}`
												}}
											/>
										</Card>
										<Listbox
											className="gap-0 bg-content1 min-w-[280px]
										 overflow-visible rounded-medium p-0"
											itemClasses={{
												base: 'px-8 last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80'
											}}>
											<ListboxItem
												key={`account`}
												onPress={() => { router.push('/account') }}
												startContent={<UserIcon size={24} />}
												endContent={<ChevronRightIcon />}>
												Account Center
											</ListboxItem>
											<ListboxItem
												key={`upload`}
												showDivider
												onPress={() => { router.push('/upload') }}
												startContent={<UploadIcon size={24} />}
												endContent={<ChevronRightIcon />}>
												Upload Video
											</ListboxItem>
											<ListboxItem
												key={`out`}
												onPress={() => {
													removeAuthToken()
													router.refresh()
												}}
												startContent={<SignOutIcon size={24} className="p-1" />}
												endContent={<ChevronRightIcon />}>
												Sign Out
											</ListboxItem>
										</Listbox>
									</>
								}>
								<Avatar isBordered
									size="sm"
									src={`${StoreFileHost}${authInfo.information?.profile}`}
									name={authInfo.information?.username}>
								</Avatar>
							</Tooltip>
							:
							(
								<>
									<Button variant="light"
										onClick={() => { router.push("/sign-in") }}
										size="sm">
										Sign in
									</Button>
									<Button color="primary" size="sm"
										onClick={() => { router.push("/sign-up") }}>
										Sign up
									</Button>
								</>
							)
					}
				</NavbarItem>
			</NavbarContent>
		</NextUINavbar>
	);
};
