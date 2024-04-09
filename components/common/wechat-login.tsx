/*
 * @Author: err0r
 * @Date: 2023-11-19 22:10:13
 * @LastEditors: err0r
 * @LastEditTime: 2023-11-21 23:07:10
 * @Description: WeChat login component
 * @FilePath: \bee-channel-front\components\common\wechat-login.tsx
 */
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { ClassValue } from 'tailwind-variants';
import qs from 'qs';

export const WeChatLogin = (props: {
	className?: ClassValue;
	codeImageHeight?: string;
	codeImageWidth?: string;
}) => {
	const container_ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		var weChatParam = {
			appid: 'wxed9954c01bb89b47',
			scope: 'snsapi_login',
			redirect_uri: 'http://localhost:8160/auth/WeChatLogin',
			state: '123456',
			self_redirect: true,
			response_type: 'code',
			lang: 'en',
		};

		var codeRequest =
			`https://open.weixin.qq.com/connect/qrconnect?` +
			qs.stringify(weChatParam);

		var codeIframe = document.createElement('iframe');
		codeIframe.width = props.codeImageWidth || '300px';
		codeIframe.height = props.codeImageHeight || '400px';
		codeIframe.scrolling = 'no';
		codeIframe.src = codeRequest;
		container_ref.current?.appendChild(codeIframe);
	}, []);
	return (
		<div
			className={clsx(
				'border-2 rounded-xl overflow-hidden mb-4 flex items-center pt-6 h-[300px]',
				props.className,
			)}>
			<div
				className={clsx('', props.className)}
				ref={container_ref}
			/>
		</div>
	);
};
