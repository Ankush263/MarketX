import { Flex, Text } from '@mantine/core';
import React from 'react';

function FooterComponent() {
	return (
		<Flex
			sx={{ backgroundColor: '#fcf894' }}
			h={250}
			mb={50}
			justify={'space-around'}
			align={'center'}
		>
			<Text ff={'Josefin Sans'} mr={50} fz={30} fw={700}>
				MarketX
			</Text>

			<Flex
				h={150}
				direction={'column'}
				justify={'space-around'}
				align={'start'}
			>
				<Text ff={'Josefin Sans'} fw={500}>
					INFORMATION
				</Text>
				<Flex direction={'column'}>
					<Text ff={'Josefin Sans'}>About us</Text>
					<Text ff={'Josefin Sans'}>Search</Text>
					<Text ff={'Josefin Sans'}>Contacts</Text>
					<Text ff={'Josefin Sans'}>Our News</Text>
				</Flex>
			</Flex>
			<Flex
				h={150}
				direction={'column'}
				justify={'space-around'}
				align={'start'}
			>
				<Text ff={'Josefin Sans'} fw={500}>
					CONTACTS
				</Text>
				<Flex direction={'column'}>
					<Text ff={'Josefin Sans'}>{'Phone: +1-202-555-0158'}</Text>
					<Text ff={'Josefin Sans'}>{'Email: ankushbanik263@gmail.com'}</Text>
					<Text ff={'Josefin Sans'}>{'Address: 165th St, Jamaica, NY 11'}</Text>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default FooterComponent;
