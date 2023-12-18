import { Box } from '@mantine/core';
import RegisterComponent from '../../components/auth/RegisterComponent';
import LoginComponent from '../../components/auth/LoginComponent';
import { useState } from 'react';

function AuthPage() {
	const [login, setLogin] = useState(true);
	return (
		<Box>
			{login ? (
				<LoginComponent setLogin={setLogin} />
			) : (
				<RegisterComponent setLogin={setLogin} />
			)}
		</Box>
	);
}

export default AuthPage;
