export type SiteConfig = typeof siteConfig;
import { HistoryIcon, HomeIcon, LaterIcon, LibraryIcon, ListIcon, Logo, MenuIcon, PlaylistIcon, VideoIcon } from '@/components/common/icons';

export const siteConfig = {
	name: "bee-channel",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		[
			{
				label: "Home",
				href: "/",
				key: '',
				Icon: <HomeIcon />
			},
			{
				label: "Live",
				href: "/live",
				key: 'live',
				Icon: <VideoIcon />
			},
			{
				label: "Subscriptions",
				href: "/subscriptions",
				key: 'subscriptions',
				Icon: <ListIcon />
			},
		],
		[
			{
				label: "Library",
				href: "/library",
				key: 'library',
				Icon: <LibraryIcon />
			},
			{
				label: "History",
				href: "/history",
				key: 'history',
				Icon: <HistoryIcon />
			},
			{
				label: "Playlist",
				href: "/playlist",
				key: "playlist",
				Icon: <PlaylistIcon />
			},
			{
				label: "Watch later",
				href: "/later",
				key: 'later',
				Icon: <LaterIcon />
			}
		]
	],
};
