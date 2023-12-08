import {
	Box,
	Flex,
	Text,
	TextInput,
	PasswordInput,
	Button,
} from '@mantine/core';
import { useCallback, useState } from 'react';
import { setLogin } from '../../../redux/auth/authSlice';
import { useDispatch } from 'react-redux';
import { signup } from '../../../api';
import {
	callErrorNotification,
	callSuccessNotification,
} from '../../../notification';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';

function RegisterComponent() {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');

	const history = useHistory();
	const dispatch = useDispatch();

	const handleClick = useCallback(async () => {
		try {
			if (password !== passwordConfirm) {
				callErrorNotification('Password Confirm does not match with password');
				return;
			}
			const response = await signup({ username, email, password });
			const token = response.data.token;
			const expire =
				new Date().getTime() + Number(import.meta.env.VITE_TOKEN_EXPIRE_TIME);
			localStorage.setItem(
				'Token',
				JSON.stringify({ value: `${token}`, expires: expire })
			);
			callSuccessNotification(
				`Congrats🎉🎉 you've successfully registered into our market`
			);
			setTimeout(() => {
				history.go(0);
			}, 2000);
		} catch (error) {
			console.log(error);
			error instanceof AxiosError &&
				callErrorNotification(error.response?.data.message);
		}
	}, [email, history, password, passwordConfirm, username]);

	return (
		<Flex direction={'column'} w={400} h={450} justify={'space-around'}>
			<Box>
				<Text ff={'Josefin Sans'} align="center" fz={19} fw={600}>
					Registration to Our Store
				</Text>
				<Text ff={'Josefin Sans'} align="center" fz={12}>
					Register to our store an start shopping your products
				</Text>
			</Box>
			<Box>
				<TextInput
					placeholder="Username"
					label="Username"
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Box>
			<Box>
				<TextInput
					placeholder="Your email"
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
			<Box>
				<PasswordInput
					placeholder="Confirm Password"
					label="Confirm Password"
					onChange={(e) => setPasswordConfirm(e.target.value)}
				/>
			</Box>
			<Flex direction={'column'} justify={'center'} align={'center'}>
				<Button
					radius="xl"
					uppercase
					w={200}
					color={
						passwordConfirm.length > 1 && password === passwordConfirm
							? 'dark'
							: 'red'
					}
					fz={12}
					onClick={handleClick}
				>
					create account
				</Button>
				<Text
					mt={5}
					fz={12}
					onClick={() => dispatch(setLogin(true))}
					sx={{ cursor: 'pointer' }}
				>
					Already have an account? Log in here
				</Text>
			</Flex>
		</Flex>
	);
}

export default RegisterComponent;
