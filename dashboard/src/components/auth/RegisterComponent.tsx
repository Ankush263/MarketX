import {
	Card,
	Flex,
	PasswordInput,
	TextInput,
	Text,
	Button,
} from '@mantine/core';
import { useState } from 'react';
import { signup } from '../../api';
import { useMutation } from '@tanstack/react-query';
import { useHistory } from 'react-router-dom';

interface LoginInterface {
	setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function RegisterComponent({ setLogin }: LoginInterface) {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
	const history = useHistory();

	const handleRegister = async () => {
		const response = await signup({
			username,
			email,
			password,
			role: 'business',
		});
		const token = response.data.token;
		const expire =
			new Date().getTime() + Number(import.meta.env.VITE_TOKEN_EXPIRE_TIME);
		localStorage.setItem(
			'Token',
			JSON.stringify({ value: `${token}`, expires: expire })
		);
		return token;
	};

	const signupMutation = useMutation({
		mutationFn: handleRegister,
		onSuccess: () => {
			history.replace('/');
		},
		onError: (error) => {
			console.log(error);
		},
	});

	return (
		<Flex
			h={'100vh'}
			justify={'center'}
			align={'center'}
			bg={'rgb(27, 38, 53)'}
		>
			<Card bg={'rgb(35, 48, 68)'} w={500} h={490} radius={15}>
				<Text
					color="white"
					ff={'Kaushan Script'}
					mr={50}
					fz={30}
					fw={700}
					align="center"
					mb={20}
				>
					MarketX
				</Text>
				<TextInput
					placeholder="Username"
					label="Username"
					onChange={(e) => setUsername(e.target.value)}
					labelProps={{ style: { color: 'white' } }}
				/>
				<TextInput
					placeholder="Your email"
					label="Email"
					onChange={(e) => setEmail(e.target.value)}
					labelProps={{ style: { color: 'white' } }}
				/>
				<PasswordInput
					placeholder="Password"
					label="Password"
					onChange={(e) => setPassword(e.target.value)}
					labelProps={{ style: { color: 'white' } }}
				/>
				<PasswordInput
					placeholder="Confirm Password"
					label="Confirm Password"
					onChange={(e) => setPasswordConfirm(e.target.value)}
					labelProps={{ style: { color: 'white' } }}
				/>
				<Button
					mt={20}
					w={'100%'}
					onClick={() => signupMutation.mutate()}
					disabled={passwordConfirm.length > 0 && password !== passwordConfirm}
				>
					Register
				</Button>
				<Text
					color="white"
					fz={12}
					align="center"
					mt={10}
					sx={{ cursor: 'pointer' }}
					onClick={() => setLogin(true)}
				>
					Already have an account, Login here
				</Text>
			</Card>
		</Flex>
	);
}

export default RegisterComponent;
