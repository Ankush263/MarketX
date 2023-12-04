import { Text, ActionIcon, Flex } from '@mantine/core';
import { IconSettings2 } from '@tabler/icons-react';
import SearchComponent from './search/SearchComponent';
import CartComponent from '../cart/CartComponent';
import AuthComponent from '../auth/AuthComponent';
import { Link } from 'react-router-dom';

function Nav() {
	return (
		<Flex justify={'center'}>
			<Flex w={'65%'} h={80} justify={'space-between'} align={'center'}>
				<Text ff={'Kaushan Script'} mr={50} fz={30} fw={700}>
					MarketX
				</Text>
				<Flex justify={'space-around'} align={'center'} w={'25%'} h={'100%'}>
					<Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
						<p style={{ fontWeight: 500, fontSize: '17px' }}>Home</p>
					</Link>
					<Link
						to={'/products'}
						style={{ textDecoration: 'none', color: 'black' }}
					>
						<p style={{ fontWeight: 500, fontSize: '17px' }}>Products</p>
					</Link>
				</Flex>

				<Flex justify={'space-around'} align={'center'} w={'30%'} h={'100%'}>
					<AuthComponent />

					<SearchComponent />
					<CartComponent />
					<ActionIcon color="dark" size="xl" variant="transparent">
						<IconSettings2 size="1.625rem" />
					</ActionIcon>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default Nav;
