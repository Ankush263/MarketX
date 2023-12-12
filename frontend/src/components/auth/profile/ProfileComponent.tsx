import { Flex, Avatar, Text, Button } from '@mantine/core';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { getMe } from '../../../api';

interface User {
	username: string;
	email: string;
}

function ProfileComponent() {
	const token = useSelector((state: RootState) => state.token.value);
	const [user, setUser] = useState<User>();

	const fetch = useCallback(async () => {
		try {
			const me = await getMe(token);
			setUser(me.data.data.doc);
		} catch (error) {
			console.log(error);
		}
	}, [token]);

	const handleLogout = () => {
		try {
			localStorage.removeItem('Token');
			history.go(0);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch();
	}, [fetch]);

	return (
		<Flex w={'100%'} h={'100%'} justify={'center'} align={'center'}>
			<Flex
				justify={'center'}
				align={'center'}
				w={320}
				h={400}
				direction={'column'}
			>
				<Avatar radius="xl" size={'xl'} />
				<Text fw={500} ff={'Josefin Sans'} fz={20}>
					Name: {user?.username}
				</Text>
				<Text fw={500} ff={'Josefin Sans'} fz={20}>
					Email: {user?.email}
				</Text>
				<Button variant="light" onClick={handleLogout}>
					Logout
				</Button>
			</Flex>
		</Flex>
	);
}

export default ProfileComponent;
