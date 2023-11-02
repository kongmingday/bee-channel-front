/*
 * @Author: err0r
 * @Date: 2023-09-23 23:02:35
 * @LastEditors: err0r
 * @LastEditTime: 2023-11-02 21:02:06
 * @Description: 
 * @FilePath: \bee-channel-front\app\(with-none)\sign-up\page.tsx
 */
"use client";
import { Button, Input, Link, Image } from "@nextui-org/react";

export default function Page() {
	const inputMap = [
		{
			label: 'Email',
			type: 'email',
			placeholder: 'Enter your email'
		},
		{
			label: 'Password',
			type: 'password',
			placeholder: 'Enter your password'
		},
		{
			label: 'Confirm',
			type: 'password',
			placeholder: 'Confirm your password'
		}
	]


	return (
		<div className="flex gap-48 justify-center" >
			<Image
				removeWrapper
				className="w-96 h-96 self-center"
				src="/video_streaming.svg"
				alt="mojap"
			/>
			<div className="max-w-[350px] w-[350px] flex flex-col items-center gap-4">
				<div className="flex flex-col items-center">
					<p className="text-4xl">Sign up</p>
					<p className="text-default-400 mt-4">
						Already have an account?
						<Link
							href="/sign-in"
							className="text-yellow-500 ml-2 cursor-pointer">
							Sign in
						</Link>
					</p>
				</div>
				<div className="w-full mt-4">
					{
						inputMap.map((item, index) =>
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
					<div className="flex">
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
						<Image removeWrapper
							className="mt-11 ml-4 h-12 w-2/5 object-fill"
							alt="verify code" src="https://nextui-docs-v2.vercel.app/images/album-cover.png" />
					</div>
					<Button
						className="mt-1 h-12 
						bg-gradient-to-tr from-pink-500 to-yellow-500 
						text-white shadow-lg"
						fullWidth>
						Sign up
					</Button>
				</div>
			</div>
		</div>
	);
}
