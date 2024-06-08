'use client'
import { getAuthInfoLocal } from '@/utils/common/tokenUtils'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const LoginCheck = () => {
	const router = useRouter()
	useEffect(() => {
		const authInfo = getAuthInfoLocal()
		if (!authInfo) {
			router.push('/sign-in')
		}
	}, [])
	return <></>
}
