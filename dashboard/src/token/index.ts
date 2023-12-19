export const getToken = () => {
	const token: string | null =
		window.localStorage.getItem('Token') &&
		JSON.parse(window.localStorage.getItem('Token') || '{}').value;
	return token;
};
