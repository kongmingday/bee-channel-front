"use client";

import * as React from "react";
import { IconSvgProps } from "@/types";
import clsx from "clsx";
import Image from "next/image";


export const Logo: React.FC<IconSvgProps> = ({
	size = 40,
	width,
	height,
	...props
}) => (
	<>
		<p
			className={clsx("w-36 font-bold text-lg align-middle text-inherit", props.className)}
		>
			bee-channel
		</p>
	</>
);

export const PlaylistIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="-4 -4 30 30"
			width={size || width}
			{...props}
		>
			<path d="M22 17.5L18.5 20V15L22 17.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M2 5L20 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M2 11L20 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M2 17L14 17" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	)
}

export const LibraryIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="-8 -10 64 64"
			width={size || width}
			{...props}
		>
			<path d="M0 0h48v48H0z" fill="none" />
			<path fill="currentColor" d="M8 12H4v28c0 2.21 1.79 4 4 4h28v-4H8V12zm32-8H16c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zM24 29V11l12 9-12 9z" />
		</svg>
	)
}

export const ListIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 24 24"
			width={size || width}
			{...props}
		>
			<path d="M19,8H9A1,1,0,0,1,9,6H19a1,1,0,0,1,0,2Z" fill="currentColor" />
			<path d="M19,13H9a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" fill="currentColor" />
			<path d="M19,18H9a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" fill="currentColor" />
			<circle cx="5" cy="7" fill="currentColor" r="1" /><circle cx="5" cy="12" fill="currentColor" r="1" />
			<circle cx="5" cy="17" fill="currentColor" r="1" />
		</svg>
	)
}

export const FavoriteIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 512 512"
			width={size || width}
			{...props}
		>
			<g data-name="1" id="_1"><path d="M255.13,420.36a15.07,15.07,0,0,1-3.65-.45c-53.3-13.37-97.4-36.17-131.06-67.77C91.49,325,70.91,291.54,60.92,255.4c-7.2-26-8.71-52.67-4.36-77s14.11-44.65,28.26-58.8c35.66-35.66,89-36.13,126-20.79,16.93,7,31.31,17.42,41.6,30.1q1.39,1.71,2.67,3.47,1.29-1.76,2.68-3.47c10.28-12.68,24.67-23.09,41.6-30.1,37-15.34,90.38-14.87,126,20.79,14.15,14.15,23.92,34.48,28.26,58.8s2.84,51-4.36,77c-10,36.14-30.57,69.59-59.5,96.74-33.66,31.6-77.76,54.4-131.07,67.77A15,15,0,0,1,255.13,420.36ZM162.51,118.94c-23.67,0-44,9.35-56.48,21.83C85,161.85,78.3,205.7,89.83,247.41c8.53,30.82,26.2,59.48,51.12,82.86,29.14,27.35,67.54,47.39,114.18,59.61,46.65-12.22,85.05-32.26,114.19-59.61,24.91-23.38,42.59-52,51.11-82.86,11.54-41.71,4.88-85.56-16.19-106.64-18.64-18.63-54.73-30.28-93.35-14.28-25.52,10.57-40.76,29.63-40.76,51a15,15,0,0,1-30,0c0-21.37-15.23-40.43-40.75-51A96.1,96.1,0,0,0,162.51,118.94Z" />
			</g>
		</svg>
	)
}

export const LikeIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="-18 -18 128 128"
			width={size || width}
			{...props}
		>
			<path fill="currentColor" d="M78,24H71.8828C71.2559,12.82,67.2773,0,42,0a5.9966,5.9966,0,0,0-6,6c0,10.8809-.1128,20.3687-8.6917,30H6a5.9966,5.9966,0,0,0-6,6V90a5.9966,5.9966,0,0,0,6,6H78A18.02,18.02,0,0,0,96,78V42A18.02,18.02,0,0,0,78,24ZM12,48H24V84H12ZM84,78a6.0078,6.0078,0,0,1-6,6H36V44.4023c9.9258-10.8867,11.6426-21.9257,11.9355-32.121C60,13.5938,60,19.5117,60,30a5.9966,5.9966,0,0,0,6,6H78a6.0078,6.0078,0,0,1,6,6Z" />
		</svg>
	)
}

export const UnlikeIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 24 24"
			width={size || width}
			{...props}
		>
			<path fill="currentColor" d="M19,4h-2H6.6C5.2,4,4,4.9,3.7,6.3l-1,4c-0.2,0.9,0,1.8,0.5,2.6C3.8,13.6,4.6,14,5.6,14h2.8l-0.7,1.5   C7.2,16.3,7,17.3,7,18.2c0,0.9,0.5,1.7,1.3,2l0.4,0.2c0.3,0.2,0.7,0.2,1,0.2c0.6,0,1.3-0.3,1.7-0.8l5.1-6C16.7,14,16.8,14,17,14h2   c1.7,0,3-1.3,3-3V7C22,5.3,20.7,4,19,4z M16,11.5l-6.1,7.1c-0.1,0.1-0.2,0.1-0.3,0.1l-0.4-0.2c-0.1,0-0.2-0.1-0.2-0.3   c0-0.6,0.2-1.3,0.4-1.8l1.5-2.9c0.2-0.3,0.1-0.7,0-1C10.7,12.2,10.3,12,10,12H5.6c-0.3,0-0.6-0.1-0.8-0.4c-0.2-0.2-0.3-0.6-0.2-0.9   l1-4C5.7,6.3,6.1,6,6.6,6H16V11.5z M20,11c0,0.6-0.4,1-1,1h-1v-0.2V6h1c0.6,0,1,0.4,1,1V11z" />
		</svg>
	)
}

export const ShareIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="-4 -4 38 38"
			width={size || width}
			{...props}
		>
			<g data-name="Layer 51" id="Layer_51">
				<path fill="currentColor" d="M2,29A1.12,1.12,0,0,1,1.69,29,1,1,0,0,1,1,28V27A19,19,0,0,1,17,8.24V4a1,1,0,0,1,1.6-.8l12,9a1,1,0,0,1,0,1.6l-12,9A1,1,0,0,1,17,22V18.25A18.66,18.66,0,0,0,4.93,25.67L2.81,28.59A1,1,0,0,1,2,29ZM19,6V9.12a1,1,0,0,1-.89,1,17,17,0,0,0-15,14.6l.16-.21A20.68,20.68,0,0,1,17.9,16.11a1,1,0,0,1,.77.26,1,1,0,0,1,.33.74V20l9.33-7Z" />
			</g>
		</svg>
	)
}

export const OptionsIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="-4 -4 38 38"
			width={size || width}
			{...props}
		>
			<g id="more">
				<circle cx="16" cy="16" r="2" />
				<circle cx="6" cy="16" r="2" />
				<circle cx="26" cy="16" r="2" />
			</g>
		</svg>
	)
}

export const MoreIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 24 24"
			width={size || width}
			{...props}
		>
			<circle fill="currentColor" cx="12" cy="12" r="1" />
			<circle fill="currentColor" cx="12" cy="5" r="1" />
			<circle fill="currentColor" cx="12" cy="19" r="1" />
		</svg>
	)
}

export const SortIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 48 48"
			width={size || width}
			{...props}
		>
			<path fill="currentColor" d="M6 36h12v-4H6v4zm0-24v4h36v-4H6zm0 14h24v-4H6v4z" />
			<path d="M0 0h48v48H0z" fill="none" />
		</svg>
	)
}

export const PlayIcon: React.FC<IconSvgProps> = (
	{
		size = 30,
		width,
		height,
		color,
		...props
	}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 -15 512 512"
			width={size || width}
			{...props}
		>
			<g><path fill={color || "currentColor"} d="M128,96v320l256-160L128,96L128,96z" /></g>
		</svg>
	)
}


export const LaterIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="-3 -3 30 30"
			width={size || width}
			{...props}
		>
			<path fill="currentColor" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM13,6H11v7h6V11H13Z" />
		</svg>
	)
}

export const HistoryIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="-5 -5 30 30"
			width={size || width}
			{...props}
		>
			<g fill="currentColor" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1">
				<g fill="#currentColor" id="Core" opacity="0.9" transform="translate(-464.000000, -254.000000)">
					<g id="history" transform="translate(464.000000, 254.500000)">
						<path d="M10.5,0 C7,0 3.9,1.9 2.3,4.8 L0,2.5 L0,9 L6.5,9 L3.7,6.2 C5,3.7 7.5,2 10.5,2 C14.6,2 18,5.4 18,9.5 C18,13.6 14.6,17 10.5,17 C7.2,17 4.5,14.9 3.4,12 L1.3,12 C2.4,16 6.1,19 10.5,19 C15.8,19 20,14.7 20,9.5 C20,4.3 15.7,0 10.5,0 L10.5,0 Z M9,5 L9,10.1 L13.7,12.9 L14.5,11.6 L10.5,9.2 L10.5,5 L9,5 L9,5 Z" id="Shape" />
					</g>
				</g>
			</g>
		</svg>
	)
}

export const VideoIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 64 64"
			width={size || width}
			{...props}
		>
			<path fill="currentColor"
				d="M 32 15 C 14.938 15 12.659656 15.177734 10.472656 17.427734 C 8.2856563 19.677734 8 23.252 8 32 C 8 40.748 8.2856562 44.323266 10.472656 46.572266 C 12.659656 48.821266 14.938 49 32 49 C 49.062 49 51.340344 48.821266 53.527344 46.572266 C 55.714344 44.322266 56 40.748 56 32 C 56 23.252 55.714344 19.677734 53.527344 17.427734 C 51.340344 15.177734 49.062 15 32 15 z M 32 19 C 45.969 19 49.379156 19.062422 50.535156 20.232422 C 51.691156 21.402422 52 24.538 52 32 C 52 39.462 51.691156 42.597578 50.535156 43.767578 C 49.379156 44.937578 45.969 45 32 45 C 18.031 45 14.620844 44.937578 13.464844 43.767578 C 12.308844 42.597578 12.03125 39.462 12.03125 32 C 12.03125 24.538 12.308844 21.402422 13.464844 20.232422 C 14.620844 19.062422 18.031 19 32 19 z M 27.949219 25.017578 L 27.949219 38.982422 L 40.095703 31.945312 L 27.949219 25.017578 z"></path>
		</svg>
	)
}

export const MenuIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 64 64"
			width={size || width}
			{...props}
		>
			<path fill="currentColor"
				d="M51 46c1.104 0 2 .895 2 2 0 1.105-.896 2-2 2-.601 0-37.399 0-38 0-1.104 0-2-.895-2-2 0-1.105.896-2 2-2C13.601 46 50.399 46 51 46zM51 30c1.104 0 2 .895 2 2 0 1.105-.896 2-2 2-.601 0-37.399 0-38 0-1.104 0-2-.895-2-2 0-1.105.896-2 2-2C13.601 30 50.399 30 51 30zM51 14c1.104 0 2 .895 2 2 0 1.105-.896 2-2 2-.601 0-37.399 0-38 0-1.104 0-2-.895-2-2 0-1.105.896-2 2-2C13.601 14 50.399 14 51 14z"></path>
		</svg>
	)
}

export const HomeIcon: React.FC<IconSvgProps> = ({
	size = 30,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 64 64"
			width={size || width}
			{...props}
		>
			<path fill="currentColor"
				d="M 32 8 C 31.08875 8 30.178047 8.3091875 29.435547 8.9296875 L 8.8007812 26.171875 C 8.0357812 26.810875 7.7634844 27.925203 8.2714844 28.783203 C 8.9184844 29.875203 10.35025 30.088547 11.28125 29.310547 L 12 28.710938 L 12 47 C 12 49.761 14.239 52 17 52 L 47 52 C 49.761 52 52 49.761 52 47 L 52 28.712891 L 52.71875 29.3125 C 53.09275 29.6255 53.546047 29.777344 53.998047 29.777344 C 54.693047 29.777344 55.382672 29.416656 55.763672 28.722656 C 56.228672 27.874656 55.954891 26.803594 55.212891 26.183594 L 52 23.498047 L 52 15 C 52 13.895 51.105 13 50 13 L 48 13 C 46.895 13 46 13.895 46 15 L 46 18.484375 L 34.564453 8.9296875 C 33.821953 8.3091875 32.91125 8 32 8 z M 32 12.152344 C 32.11475 12.152344 32.228766 12.191531 32.322266 12.269531 L 48 25.369141 L 48 46 C 48 47.105 47.105 48 46 48 L 38 48 L 38 34 C 38 32.895 37.105 32 36 32 L 28 32 C 26.895 32 26 32.895 26 34 L 26 48 L 18 48 C 16.895 48 16 47.105 16 46 L 16 25.367188 L 31.677734 12.269531 C 31.771234 12.191531 31.88525 12.152344 32 12.152344 z"></path>
		</svg>
	)
}

export const DiscordIcon: React.FC<IconSvgProps> = ({
	size = 24,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 24 24"
			width={size || width}
			{...props}
		>
			<path
				d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const TwitterIcon: React.FC<IconSvgProps> = ({
	size = 24,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 24 24"
			width={size || width}
			{...props}
		>
			<path
				d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const GithubIcon: React.FC<IconSvgProps> = ({
	size = 24,
	width,
	height,
	...props
}) => {
	return (
		<svg
			height={size || height}
			viewBox="0 0 24 24"
			width={size || width}
			{...props}
		>
			<path
				clipRule="evenodd"
				d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
				fill="currentColor"
				fillRule="evenodd"
			/>
		</svg>
	);
};

export const MoonFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden="true"
		focusable="false"
		height={size || height}
		role="presentation"
		viewBox="0 0 24 24"
		width={size || width}
		{...props}
	>
		<path
			d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
			fill="currentColor"
		/>
	</svg>
);

export const SunFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden="true"
		focusable="false"
		height={size || height}
		role="presentation"
		viewBox="0 0 24 24"
		width={size || width}
		{...props}
	>
		<g fill="currentColor">
			<path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
			<path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
		</g>
	</svg>
);

export const HeartFilledIcon = ({
	size = 24,
	width,
	height,
	...props
}: IconSvgProps) => (
	<svg
		aria-hidden="true"
		focusable="false"
		height={size || height}
		role="presentation"
		viewBox="0 0 24 24"
		width={size || width}
		{...props}
	>
		<path
			d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
			fill="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
	</svg>
);

export const SearchIcon = (props: IconSvgProps) => (
	<svg
		aria-hidden="true"
		fill="none"
		focusable="false"
		height="1em"
		role="presentation"
		viewBox="0 0 24 24"
		width="1em"
		{...props}
	>
		<path
			d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		/>
		<path
			d="M22 22L20 20"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		/>
	</svg>
);

export const NextUILogo: React.FC<IconSvgProps> = (props) => {
	const { width, height = 40 } = props;

	return (
		<svg
			fill="none"
			height={height}
			viewBox="0 0 161 32"
			width={width}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				className="fill-black dark:fill-white"
				d="M55.6827 5V26.6275H53.7794L41.1235 8.51665H40.9563V26.6275H39V5H40.89L53.5911 23.1323H53.7555V5H55.6827ZM67.4831 26.9663C66.1109 27.0019 64.7581 26.6329 63.5903 25.9044C62.4852 25.185 61.6054 24.1633 61.0537 22.9582C60.4354 21.5961 60.1298 20.1106 60.1598 18.6126C60.132 17.1113 60.4375 15.6228 61.0537 14.2563C61.5954 13.0511 62.4525 12.0179 63.5326 11.268C64.6166 10.5379 65.8958 10.16 67.1986 10.1852C68.0611 10.1837 68.9162 10.3468 69.7187 10.666C70.5398 10.9946 71.2829 11.4948 71.8992 12.1337C72.5764 12.8435 73.0985 13.6889 73.4318 14.6152C73.8311 15.7483 74.0226 16.9455 73.9968 18.1479V19.0773H63.2262V17.4194H72.0935C72.1083 16.4456 71.8952 15.4821 71.4714 14.6072C71.083 13.803 70.4874 13.1191 69.7472 12.6272C68.9887 12.1348 68.1022 11.8812 67.2006 11.8987C66.2411 11.8807 65.3005 12.1689 64.5128 12.7223C63.7332 13.2783 63.1083 14.0275 62.6984 14.8978C62.2582 15.8199 62.0314 16.831 62.0352 17.8546V18.8476C62.009 20.0078 62.2354 21.1595 62.6984 22.2217C63.1005 23.1349 63.7564 23.9108 64.5864 24.4554C65.4554 24.9973 66.4621 25.2717 67.4831 25.2448C68.1676 25.2588 68.848 25.1368 69.4859 24.8859C70.0301 24.6666 70.5242 24.3376 70.9382 23.919C71.3183 23.5345 71.6217 23.0799 71.8322 22.5799L73.5995 23.1604C73.3388 23.8697 72.9304 24.5143 72.4019 25.0506C71.8132 25.6529 71.1086 26.1269 70.3314 26.4434C69.4258 26.8068 68.4575 26.9846 67.4831 26.9663V26.9663ZM78.8233 10.4075L82.9655 17.325L87.1076 10.4075H89.2683L84.1008 18.5175L89.2683 26.6275H87.103L82.9608 19.9317L78.8193 26.6275H76.6647L81.7711 18.5169L76.6647 10.4062L78.8233 10.4075ZM99.5142 10.4075V12.0447H91.8413V10.4075H99.5142ZM94.2427 6.52397H96.1148V22.3931C96.086 22.9446 96.2051 23.4938 96.4597 23.9827C96.6652 24.344 96.9805 24.629 97.3589 24.7955C97.7328 24.9548 98.1349 25.0357 98.5407 25.0332C98.7508 25.0359 98.9607 25.02 99.168 24.9857C99.3422 24.954 99.4956 24.9205 99.6283 24.8853L100.026 26.5853C99.8062 26.6672 99.5805 26.7327 99.3511 26.7815C99.0274 26.847 98.6977 26.8771 98.3676 26.8712C97.6854 26.871 97.0119 26.7156 96.3973 26.4166C95.7683 26.1156 95.2317 25.6485 94.8442 25.0647C94.4214 24.4018 94.2097 23.6242 94.2374 22.8363L94.2427 6.52397ZM118.398 5H120.354V19.3204C120.376 20.7052 120.022 22.0697 119.328 23.2649C118.644 24.4235 117.658 25.3698 116.477 26.0001C115.168 26.6879 113.708 27.0311 112.232 26.9978C110.759 27.029 109.302 26.6835 107.996 25.9934C106.815 25.362 105.827 24.4161 105.141 23.2582C104.447 22.0651 104.092 20.7022 104.115 19.319V5H106.08V19.1831C106.061 20.2559 106.324 21.3147 106.843 22.2511C107.349 23.1459 108.094 23.8795 108.992 24.3683C109.993 24.9011 111.111 25.1664 112.242 25.139C113.373 25.1656 114.493 24.9003 115.495 24.3683C116.395 23.8815 117.14 23.1475 117.644 22.2511C118.16 21.3136 118.421 20.2553 118.402 19.1831L118.398 5ZM128 5V26.6275H126.041V5H128Z"
			/>
			<path
				className="fill-black dark:fill-white"
				d="M23.5294 0H8.47059C3.79241 0 0 3.79241 0 8.47059V23.5294C0 28.2076 3.79241 32 8.47059 32H23.5294C28.2076 32 32 28.2076 32 23.5294V8.47059C32 3.79241 28.2076 0 23.5294 0Z"
			/>
			<path
				className="fill-white dark:fill-black"
				d="M17.5667 9.21729H18.8111V18.2403C18.8255 19.1128 18.6 19.9726 18.159 20.7256C17.7241 21.4555 17.0968 22.0518 16.3458 22.4491C15.5717 22.8683 14.6722 23.0779 13.6473 23.0779C12.627 23.0779 11.7286 22.8672 10.9521 22.4457C10.2007 22.0478 9.5727 21.4518 9.13602 20.7223C8.6948 19.9705 8.4692 19.1118 8.48396 18.2403V9.21729H9.72854V18.1538C9.71656 18.8298 9.88417 19.4968 10.2143 20.0868C10.5362 20.6506 11.0099 21.1129 11.5814 21.421C12.1689 21.7448 12.8576 21.9067 13.6475 21.9067C14.4374 21.9067 15.1272 21.7448 15.7169 21.421C16.2895 21.1142 16.7635 20.6516 17.0844 20.0868C17.4124 19.4961 17.5788 18.8293 17.5667 18.1538V9.21729ZM23.6753 9.21729V22.845H22.4309V9.21729H23.6753Z"
			/>
		</svg>
	);
};
