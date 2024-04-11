import { PayRecordParam } from '@/types/order';
import { get, post } from '@/utils/common/fetchUtil';

const serviceName = process.env.NEXT_PUBLIC_ORDER_SERVICE;

export const getQrcCode = (data: PayRecordParam) => {
	return post(`/${serviceName}/qrc/generate`, data);
};

export const getLiveRoomAmount = () => {
	return get(`/${serviceName}/amount`);
};
