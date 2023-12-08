import { Box, ActionIcon, Modal, Flex, Image } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import LoginComponent from './login/LoginComponent';
import RegisterComponent from './register/RegisterComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

function AuthComponent() {
	const [opened, { open, close }] = useDisclosure(false);
	const login = useSelector((state: RootState) => state.auth.value);

	return (
		<Box>
			<Modal
				size={1200}
				opened={opened}
				onClose={close}
				centered
				withCloseButton={false}
				padding={0}
				radius={'xl'}
			>
				<Flex>
					{!login ? (
						<Image width={600} src="/image/popup-login-toys.webp" />
					) : (
						<Image width={600} src="/image/popup-newsletter-toys.webp" />
					)}
					<Flex
						direction={'column'}
						w={'50%'}
						h={600}
						justify={'center'}
						align={'center'}
					>
						{login ? <LoginComponent /> : <RegisterComponent />}
					</Flex>
				</Flex>
			</Modal>
			<ActionIcon color="dark" size="xl" variant="transparent" onClick={open}>
				<IconUser size="1.625rem" />
			</ActionIcon>
		</Box>
	);
}

export default AuthComponent;
