import { ActionIcon, Flex, Text } from '@mantine/core';
import { useComponentStyle } from '../nav/styles/useComponentStyle';
import { IconLogout } from '@tabler/icons-react';
import { useHistory } from 'react-router-dom';

function LogoutComponent() {
	const styles = useComponentStyle();
	const history = useHistory();

	const handleLogout = async () => {
		window.localStorage.removeItem('Token');
		history.push('/auth');
	};

	return (
		<Flex
			w={250}
			sx={styles.hoverComponent}
			align={'center'}
			onClick={handleLogout}
		>
			<ActionIcon variant="transparent">
				<IconLogout color="white" size="1.2rem" />
			</ActionIcon>
			<Text fw={500} color="white" fz={15} ml={12}>
				Logout
			</Text>
		</Flex>
	);
}

export default LogoutComponent;
