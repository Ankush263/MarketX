import { Flex, Text } from '@mantine/core';
import TableBtnComponent from '../TableBtnComponent';
import ProductsDimensionButton from '../products/dimensions/ProductsDimensionButton';
import ProductMetricesButton from '../products/metrices/ProductMetricesButton';
import UserDimensionButton from '../users/dimensions/UserDimensionButton';
import UserMetrices from '../users/metrices/UserMetrices';
import BuyDimensionComponent from './dimensions/BuyDimensionComponent';
import BuyMetricesComponent from './metrices/BuyMetricesComponent';

function BuyButtonComponent() {
	return (
		<Flex w={'100%'} direction={'column'} align={'center'}>
			<TableBtnComponent
				name="Buy"
				tooltipText="This table has a besic information about buy, as well as some derived fact about users based on buy"
			/>
			<Flex mt={20} w={'85%'} mb={20}>
				<Text color="#228be6">Dimensions</Text>
			</Flex>
			<BuyDimensionComponent />
			<Flex mt={20} w={'85%'} mb={20}>
				<Text color="#deb821">Metrices</Text>
			</Flex>
			<BuyMetricesComponent />
			<TableBtnComponent
				name="Products"
				tooltipText="This table has a besic information about products, as well as some derived fact about users based on products"
			/>
			<Flex mt={20} w={'85%'} mb={20}>
				<Text color="#228be6">Dimensions</Text>
			</Flex>
			<ProductsDimensionButton />
			<Flex mt={20} w={'85%'} mb={20}>
				<Text color="#deb821">Metrices</Text>
			</Flex>
			<ProductMetricesButton />
			<TableBtnComponent
				name="Users"
				tooltipText="This table has a besic information about Users, as well as some derived fact about users based on users"
			/>
			<Flex mt={20} w={'85%'} mb={20}>
				<Text color="#228be6">Dimensions</Text>
			</Flex>
			<UserDimensionButton />
			<Flex mt={20} w={'85%'} mb={20}>
				<Text color="#deb821">Metrices</Text>
			</Flex>
			<UserMetrices />
		</Flex>
	);
}

export default BuyButtonComponent;
