import { Toast, ToastMode } from '@/components/common/toast';
import { post } from '@/utils/common/fetchUtil';

const serviceName = process.env.NEXT_PUBLIC_CHECKCODE_SERVICE;

export const getVerifyCode = () => {
	return post(`/${serviceName}/pic`);
};

export const sendCodeToEmail = (email: string) => {
	return post(`/${serviceName}/sendCode`, null, { param: email });
};

export const verify = (key: string, code: string, process?: () => void) => {
	return post(`/${serviceName}/verify`, null, { key, code }).then(res => {
		if (!res) {
			process ? process() : Toast('verify error', ToastMode.ERROR);
			throw new Error('verify error');
		}
	});
};
