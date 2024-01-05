import {
	Card,
	Flex,
	PasswordInput,
	TextInput,
	Text,
	Button,
	Loader,
} from '@mantine/core';
import { useState } from 'react';
import { login } from '../../api';
import { useMutation } from '@tanstack/react-query';
import { useHistory } from 'react-router-dom';

interface LoginInterface {
	setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginComponent({ setLogin }: LoginInterface) {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const history = useHistory();

	const handleLogin = async () => {
		setLoading(true);
		const response = await login({ email, password });
		const token = response.data.token;
		const expire =
			new Date().getTime() + Number(import.meta.env.VITE_TOKEN_EXPIRE_TIME);
		localStorage.setItem(
			'Token',
			JSON.stringify({ value: `${token}`, expires: expire })
		);
		return token;
	};

	const loginMutation = useMutation({
		mutationFn: handleLogin,
		onSuccess: () => {
			setLoading(false);
			history.replace('/');
		},
		onError: (error) => {
			setLoading(false);
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
			<Card bg={'rgb(35, 48, 68)'} w={500} h={350} radius={15}>
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
				<Button mt={20} w={'100%'} onClick={() => loginMutation.mutate()}>
					{loading ? <Loader variant="dots" color="white" /> : 'Login'}
				</Button>
				<Text
					color="white"
					fz={12}
					align="center"
					mt={10}
					sx={{ cursor: 'pointer' }}
					onClick={() => setLogin(false)}
				>
					{`Don't have an account, Register here`}
				</Text>
				<Flex direction={'column'} mt={10}>
					<Text color="white" fz={14} fw={500} align="center">
						{`Email: business1@gmail.com`}
					</Text>
					<Text color="white" fz={14} fw={500} align="center">
						{`Password: test1234`}
					</Text>
				</Flex>
			</Card>
		</Flex>
	);
}

export default LoginComponent;
