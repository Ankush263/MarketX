import {
	Box,
	Flex,
	Text,
	TextInput,
	PasswordInput,
	Button,
} from '@mantine/core';
import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';

function RegisterComponent({ handleLogin }: any) {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');

	// const { data } = useQuery({
	// 	queryKey: ['register-user'],
	// 	queryFn: async () =>
	// 		await (await fetch('http://localhost:8000/api/v1/users')).json(),
	// });

	const handleClick = async () => {
		try {
			console.log(username, email, password, passwordConfirm);
			console.log(password === passwordConfirm);
			console.log(passwordConfirm.length);
			console.log(passwordConfirm.length > 1 && password === passwordConfirm);
			// console.log('data: ', data);
		} catch (error) {
			console.log(error);
		}
	};

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
				<Text mt={5} fz={12} onClick={handleLogin} sx={{ cursor: 'pointer' }}>
					Already have an account? Log in here
				</Text>
			</Flex>
		</Flex>
	);
}

export default RegisterComponent;
