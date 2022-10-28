import { API_URL } from '@env';
import { create } from 'apisauce';
export const apiInstance = create({
	baseURL: 'http://gateway.marvel.com/',
	headers: {
		'If-None-Match': 'alwaysdoit'
	}
});
