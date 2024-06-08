'use client';
import { login } from '@/api/auth';
import { setAuthToken } from '@/utils/common/tokenUtils';
import { Spinner } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
	const searchParam = useSearchParams();
	const router = useRouter();
	useEffect(() => {
		const unionId = searchParam.get('unionId');
		const authType = searchParam.get('authType');
		if (unionId && authType) {
			login({ unionId, authType }).then(res => {
				setAuthToken(res.access_token);
				top?.location.assign('/');
			});
		}
	}, []);

	return (
		<div className='mt-32 ml-16'>
			<Spinner
				classNames={{
					wrapper: 'w-20 h-20',
				}}
				label='Please wait for seconds'
				color='secondary'
			/>
		</div>
	);
}
