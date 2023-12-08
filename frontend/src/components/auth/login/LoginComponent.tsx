import { useState } from 'react';
import {
	Box,
	Flex,
	Text,
	TextInput,
	PasswordInput,
	Button,
} from '@mantine/core';
import { setLogin } from '../../../redux/auth/authSlice';
import { useDispatch } from 'react-redux';
import { login } from '../../../api';
import {
	callSuccessNotification,
	callErrorNotification,
} from '../../../notification';
import { AxiosError } from 'axios';

function LoginComponent() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const dispatch = useDispatch();

	const handleClick = async () => {
		try {
			const response = await login({ email, password });
			const token = response.data.token;
			const expire =
				new Date().getTime() + Number(import.meta.env.VITE_TOKEN_EXPIRE_TIME);
			localStorage.setItem(
				'Token',
				JSON.stringify({ value: `${token}`, expires: expire })
			);
			callSuccessNotification(
				`Congrats🎉🎉 you've just successfully login into our market`
			);
			setTimeout(() => {
				history.go(0);
			}, 2000);
		} catch (error) {
			console.log(error);
			error instanceof AxiosError &&
				callErrorNotification(error.response?.data.message);
		}
	};

	return (
		<Flex direction={'column'} w={400} h={280} justify={'space-around'}>
			<Box>
				<Text ff={'Josefin Sans'} align="center" fz={22} fw={600}>
					Sign In to Our Store
				</Text>
				<Text ff={'Josefin Sans'} align="center" fz={12}>
					Login to our store an start shopping your products
				</Text>
			</Box>
			<Box>
				<TextInput
					placeholder="Enter Your Email Here"
					label="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</Box>
			<Box>
				<PasswordInput
					placeholder="Password"
					label="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Box>
			<Flex direction={'column'} justify={'center'} align={'center'}>
				<Button
					radius="xl"
					uppercase
					w={200}
					color="dark"
					fz={12}
					onClick={handleClick}
				>
					sign in
				</Button>
				<Text
					mt={5}
					fz={12}
					onClick={() => dispatch(setLogin(false))}
					sx={{ cursor: 'pointer' }}
				>
					Don't have an account? Register here
				</Text>
			</Flex>
		</Flex>
	);
}

export default LoginComponent;
