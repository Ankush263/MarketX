import axios from 'axios';

const URL = `http://localhost:8000`;

const USER_URL = `${URL}/api/v1/users`;
const PRODUCT_URL = `${URL}/api/v1/products`;
const STATS_URL = `${URL}/api/v1/stats`;

const USER_API = axios.create({ baseURL: USER_URL });
const PRODUCT_API = axios.create({ baseURL: PRODUCT_URL });
const STATS_API = axios.create({ baseURL: STATS_URL });

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

export const getTotalProducts = (_token: string | null) =>
	STATS_API.get('/totalProducts', {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getTotalRevenew = (_token: string | null) =>
	STATS_API.get('/totalRevenew', {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getTotalOrderNumber = (_token: string | null) =>
	STATS_API.get('/totalOrderNumber', {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getMe = (_token: string | null) =>
	USER_API.get('/me', {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const updateMe = (
	_token: string | null,
	{ username, email }: { username: string; email: string }
) =>
	USER_API.patch(
		'/updateMe',
		{ username, email },
		{
			headers: { Authorization: `Bearer ${_token}` },
		}
	);
