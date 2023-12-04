import React, { useState } from 'react';
import {
	Box,
	Flex,
	Text,
	TextInput,
	PasswordInput,
	Button,
} from '@mantine/core';

function LoginComponent({ handleRegister }: any) {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleClick = async () => {
		try {
			console.log(email, password);
		} catch (error) {
			console.log(error);
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
					onClick={handleRegister}
					sx={{ cursor: 'pointer' }}
				>
					Don't have an account? Register here
				</Text>
			</Flex>
		</Flex>
	);
}

export default LoginComponent;
