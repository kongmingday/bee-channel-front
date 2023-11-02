/*
 * @Author: err0r
 * @Date: 2023-09-23 23:02:35
 * @LastEditors: err0r
 * @LastEditTime: 2023-11-02 22:39:15
 * @Description: 
 * @FilePath: \bee-channel-front\app\(with-none)\sign-in\page.tsx
 */

"use client";
import { WeChatIcon } from "@/components/common/icons";
import { Button, Input, Link, Image, Divider } from "@nextui-org/react";
import { useState } from "react";

const SignInForm = (
	props: {

	}
) => {

	const inputMapByPassword = [
		{
			label: 'Email',
			type: 'email',
			placeholder: 'Enter your email'
		},
		{
			label: 'Password',
			type: 'password',
			placeholder: 'Enter your password'
		}
	]

	const inputMapByEmail = [
		{
			label: 'Email',
			type: 'email',
			placeholder: 'Enter your email'
		}
	]

	const signMethodChange = (targetMethod: string) => {
		setSignMethod(targetMethod)
		if (targetMethod === 'email') {
			setSignMethodMap(inputMapByEmail)
		} else {
			setSignMethodMap(inputMapByPassword)
		}
	}

	const [signMethod, setSignMethod] = useState('email')
	const [signMethodMap, setSignMethodMap] = useState(inputMapByEmail)

	return (
		<div className="w-full mt-4 flex flex-col items-center">
			{
				signMethodMap.map((item, index) =>
					<Input
						key={index}
						className="mb-6"
						classNames={{
							label: "text-md",
							input: 'pl-2',
							inputWrapper: 'h-12 mt-2'
						}}
						fullWidth
						isClearable
						type={item.type}
						label={item.label}
						labelPlacement="outside"
						placeholder={item.placeholder}
					/>
				)
			}
			<div className="flex gap-4">
				<Input
					className="mb-6 w-3/5"
					classNames={{
						label: "text-lg",
						input: 'text-md pl-2',
						inputWrapper: 'h-12 mt-2'
					}}
					fullWidth
					isClearable
					label="code"
					labelPlacement="outside"
					placeholder='Verify code'
				/>
				{
					signMethod !== 'email' ?
						<Image removeWrapper
							className="mt-11 ml-4 h-12 w-2/5 object-fill"
							alt="verify code" src="https://nextui-docs-v2.vercel.app/images/album-cover.png" /> :
						<Button className="h-12 mt-11
						bg-gradient-to-tr from-pink-500 to-yellow-500
						w-3/5">
							Send code
						</Button>
				}
			</div>
			<Button
				className="mt-1 h-12 
						bg-gradient-to-tr from-pink-500 to-yellow-500 
						text-white shadow-lg"
				fullWidth>
				Sign in
			</Button>
			<Link
				onClick={() => { signMethodChange(signMethod === 'email' ? 'password' : 'email') }}
				className="text-default-400 my-6">
				Sign in using {signMethod === 'email' ? 'password' : 'email'}
			</Link>
			<div className="flex justify-center items-center w-full overflow-hidden">
				<Divider className="w-[45%]" />
				<p className="mx-4 text-default-400">or</p>
				<Divider className="w-[45%]" />
			</div>
			<div className="w-full mt-2 px-2">
				<Button variant="light" isIconOnly>
					<WeChatIcon />
				</Button>
			</div>
		</div>
	)
}

export default function Page() {




	return (
		<div className="flex gap-48 justify-center items-center h-full grow" >
			<div className="relative h-full">
				<Image
					removeWrapper
					className="w-96 h-96 self-center"
					src="/sign_in.svg"
					alt="mojap"
				/>
			</div>
			<div className="w-[350px] flex flex-col items-center gap-4">
				<div className="flex flex-col items-center">
					<p className="text-4xl">Sign in</p>
					<p className="text-default-400 mt-4">
						First time here?
						<Link
							href="/sign-up"
							className="text-yellow-500 ml-2 cursor-pointer">
							Sign up
						</Link>
					</p>
				</div>
				<SignInForm />
			</div>
		</div>
	);
}
