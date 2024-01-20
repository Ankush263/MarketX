import axios from 'axios';

// const URL = `https://marketx-vudv.onrender.com`;
const URL = `http://localhost:8000`;

const USER_URL = `${URL}/api/v1/users`;
const PRODUCT_URL = `${URL}/api/v1/products`;
const CART_URL = `${URL}/api/v1/cart`;
const BUY_URL = `${URL}/api/v1/buy`;

const USER_API = axios.create({ baseURL: USER_URL });
const PRODUCT_API = axios.create({ baseURL: PRODUCT_URL });
const CART_API = axios.create({ baseURL: CART_URL });
const BUY_API = axios.create({ baseURL: BUY_URL });

export const signup = (_details: {
	username: string;
	email: string;
	password: string;
	role: string;
}) => USER_API.post('/signup', _details);

export const login = (_details: { email: string; password: string }) =>
	USER_API.post('/login', _details);

export const getMe = (_token: string | null) =>
	USER_API.get('/me', { headers: { Authorization: `Bearer ${_token}` } });

export const getProducts = () => PRODUCT_API.get('/');

export const getSingleProduct = (id: string, _token: string | null) =>
	PRODUCT_API.get(`/${id}`, { headers: { Authorization: `Bearer ${_token}` } });

export const addToCart = (productId: string, _token: string | null) =>
	CART_API.post(
		'/',
		{ productId },
		{
			headers: { Authorization: `Bearer ${_token}` },
		}
	);

export const removeFromCart = (productId: string, _token: string | null) =>
	CART_API.post(
		'/remove',
		{ productId },
		{
			headers: { Authorization: `Bearer ${_token}` },
		}
	);

export const getMyCartItems = (_token: string | null) =>
	CART_API.get('/myCart', { headers: { Authorization: `Bearer ${_token}` } });

export const getTotal = (_token: string | null) =>
	CART_API.get('/total', { headers: { Authorization: `Bearer ${_token}` } });

export const deleteCartByUserId = (_token: string | null) =>
	CART_API.delete(`/deleteByUserId`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const startCheckoutSession = (_token: string | null) =>
	BUY_API.get('/checkout-session', {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const search = (_token: string | null, query: string) =>
	PRODUCT_API.get(`/search?name=${query}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getTopFourProducts = () => PRODUCT_API.get('/top-4-products');
