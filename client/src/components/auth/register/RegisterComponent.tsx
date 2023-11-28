import {
	Box,
	Flex,
	Text,
	TextInput,
	PasswordInput,
	Button,
} from '@mantine/core';
import React from 'react';

function RegisterComponent({ handleLogin }: any) {
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
				<TextInput placeholder="Username" label="Username" />
			</Box>
			<Box>
				<TextInput placeholder="Your email" label="Email" />
			</Box>
			<Box>
				<PasswordInput placeholder="Password" label="Password" />
			</Box>
			<Box>
				<PasswordInput
					placeholder="Confirm Password"
					label="Confirm Password"
				/>
			</Box>
			<Flex direction={'column'} justify={'center'} align={'center'}>
				<Button radius="xl" uppercase w={200} color="dark" fz={12}>
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
