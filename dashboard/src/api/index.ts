import axios from 'axios';

const URL = `http://localhost:8000`;

const USER_URL = `${URL}/api/v1/users`;
const PRODUCT_URL = `${URL}/api/v1/products`;

const USER_API = axios.create({ baseURL: USER_URL });
const PRODUCT_API = axios.create({ baseURL: PRODUCT_URL });

export const signup = (_details: {
	username: string;
	email: string;
	password: string;
	role: string;
}) => USER_API.post('/signup', _details);

export const login = (_details: { email: string; password: string }) =>
	USER_API.post('/login', _details);

export const createProduct = (_token: string | null, _formData: FormData) =>
	PRODUCT_API.post(`/`, _formData, {
		headers: { Authorization: `Bearer ${_token}` },
	});
