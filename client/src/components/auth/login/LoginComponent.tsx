import React from 'react';
import {
	Box,
	Flex,
	Text,
	TextInput,
	PasswordInput,
	Button,
} from '@mantine/core';

function LoginComponent({ handleRegister }: any) {
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
				<TextInput placeholder="Enter Your Email Here" label="Email" />
			</Box>
			<Box>
				<PasswordInput placeholder="Password" label="Password" />
			</Box>
			<Flex direction={'column'} justify={'center'} align={'center'}>
				<Button radius="xl" uppercase w={200} color="dark" fz={12}>
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
