'use client';
import { createRoot } from 'react-dom/client';
import { Card } from '@nextui-org/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export type ToastModeType = 'success' | 'info' | 'danger' | 'error';
export enum ToastMode {
	SUCCESS = 'success',
	INFO = 'info',
	DANGER = 'danger',
	ERROR = 'error',
}

export const waitForSeconds = (seconds: number, process?: () => void) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			process && process();
			resolve('ok');
		}, seconds);
	});
};

const ToastBox = (props: { message?: string; mode?: string }) => {
	const [emergence, setEmergence] = useState(false);
	const emerge = clsx({
		'-translate-y-10': !emergence,
		'translate-y-14': emergence,
	});

	useEffect(() => {
		waitForSeconds(1 * 1000)
			.then(() => {
				setEmergence(true);
				return waitForSeconds(2 * 1000);
			})
			.then(() => {
				setEmergence(false);
				return waitForSeconds(2 * 1000);
			})
			.then(() => {
				const toastBox = document.querySelector('#toast-box');
				toastBox?.remove();
			});
	}, []);

	const toastModeClass = clsx(
		emerge,
		'fixed z-[100] px-5 py-3 shadow-lg bg-zinc-200 text-black min-w-[280px] transition-transform',
		'left-1/2 -translate-x-1/2',
		{
			'bg-emerald-400': props.mode === ToastMode.SUCCESS,
			'bg-red-500': props.mode === ToastMode.ERROR,
			'bg-orange-500': props.mode === ToastMode.DANGER,
		},
	);

	return (
		<Card className={toastModeClass}>
			<p>{props.message || 'someting error'}</p>
		</Card>
	);
};

export const Toast = (message?: string, mode?: ToastModeType) => {
	const toastRoot = document.createElement('div');
	const rootClass = ['z-[100]', 'absolute', '-top-9', 'transition-transform'];
	toastRoot.id = 'toast-box';
	toastRoot.classList.add(...rootClass);
	const toast = createRoot(toastRoot);
	toast.render(
		<ToastBox
			message={message}
			mode={mode}
		/>,
	);
	document.body.appendChild(toastRoot);
};
