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
}) => USER_API.post('/signup', _details);

export const login = (_details: { email: string; password: string }) =>
	USER_API.post('/login', _details);

export const getMe = (_token: string | null) =>
	USER_API.get('/me', { headers: { Authorization: `Bearer ${_token}` } });

export const getProducts = () => PRODUCT_API.get('/');

export const getSingleProduct = (id: string, _token: string | null) =>
	PRODUCT_API.get(`/${id}`, { headers: { Authorization: `Bearer ${_token}` } });
