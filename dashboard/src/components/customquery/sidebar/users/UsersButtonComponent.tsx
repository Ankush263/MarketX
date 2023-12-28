import { Flex, Text } from '@mantine/core';
import UserDimensionButton from './dimensions/UserDimensionButton';
import UserMetrices from './metrices/UserMetrices';

function UsersButtonComponent() {
	return (
		<Flex w={'100%'} direction={'column'} align={'center'}>
			<Flex mt={20} w={'85%'}>
				<Text color="#228be6">Dimensions</Text>
			</Flex>
			<UserDimensionButton />
			<Flex mt={20} w={'85%'}>
				<Text color="#deb821">Metrices</Text>
			</Flex>
			<UserMetrices />
		</Flex>
	);
}

export default UsersButtonComponent;
