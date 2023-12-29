import { Flex, Text } from '@mantine/core';
import UserMetrices from '../users/metrices/UserMetrices';
import UserDimensionButton from '../users/dimensions/UserDimensionButton';
import ProductsDimensionButton from './dimensions/ProductsDimensionButton';
import ProductMetricesButton from './metrices/ProductMetricesButton';
import TableBtnComponent from '../TableBtnComponent';

function ProductsButtonComponent() {
	return (
		<Flex w={'100%'} direction={'column'} align={'center'}>
			<TableBtnComponent
				name="Products"
				tooltipText="This table has a besic information about products, as well as some derived fact about users based on products"
			/>
			<Flex mt={20} w={'85%'} mb={20}>
				<Text color="#228be6">Dimensions</Text>
				{/* <Text color="#228be6">Dimensions</Text> */}
			</Flex>
			<ProductsDimensionButton />
			<Flex mt={20} w={'85%'} mb={20}>
				<Text color="#deb821">Metrices</Text>
				{/* <Text color="#deb821">Metrices</Text> */}
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

export default ProductsButtonComponent;
