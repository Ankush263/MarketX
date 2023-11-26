import { Text, ActionIcon, Flex } from '@mantine/core';
import {
	IconUser,
	IconSearch,
	IconShoppingCartPlus,
	IconSettings2,
} from '@tabler/icons-react';
import React from 'react';

function Nav() {
	return (
		<Flex justify={'center'}>
			<Flex w={'65%'} h={80} justify={'space-between'} align={'center'}>
				<Text sx={{ fontFamily: 'Kaushan Script' }} mr={50} fz={30} fw={700}>
					MarketX
				</Text>
				<Flex justify={'space-around'} align={'center'} w={'25%'} h={'100%'}>
					<Text fz="lg" fw={500} component="a" href="#">
						Home
					</Text>
					<Text fz="lg" fw={500} component="a" href="#">
						Products
					</Text>
				</Flex>

				<Flex justify={'space-around'} align={'center'} w={'30%'} h={'100%'}>
					<ActionIcon color="dark" size="xl" variant="transparent">
						<IconUser size="1.625rem" />
					</ActionIcon>
					<ActionIcon color="dark" size="xl" variant="transparent">
						<IconSearch size="1.625rem" />
					</ActionIcon>
					<ActionIcon color="dark" size="xl" variant="transparent">
						<IconShoppingCartPlus size="1.625rem" />
					</ActionIcon>
					<ActionIcon color="dark" size="xl" variant="transparent">
						<IconSettings2 size="1.625rem" />
					</ActionIcon>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default Nav;
