import { Flex, TextInput, Text, ScrollArea } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import TableButtons from './table/TableButtons';
import { useParams } from 'react-router-dom';
import UsersButtonComponent from './users/UsersButtonComponent';
import ProductsButtonComponent from './products/ProductsButtonComponent';
import BuyButtonComponent from './buy/BuyButtonComponent';

interface ParamsInterface {
	tableName: string;
}

function SidebarComponents() {
	const params: ParamsInterface = useParams();

	return (
		<ScrollArea w={'100%'} h={'100vh'} sx={{ borderBottom: '1px solid black' }}>
			<Flex w={'100%'} direction={'column'} align={'center'}>
				<Text c={'white'} fz={20} fw={500} mr={'auto'} mt={20} ml={20} mb={10}>
					{params.tableName === 'users'
						? 'Tables / Users'
						: params.tableName === 'products'
						? 'Tables / Products'
						: params.tableName === 'buy'
						? 'Tables / Buy'
						: 'Tables'}
				</Text>
				<TextInput
					placeholder="Search tables"
					w={'90%'}
					icon={<IconSearch size={'1.2rem'} />}
				/>
				{params.tableName === 'users' ? (
					<UsersButtonComponent />
				) : params.tableName === 'products' ? (
					<ProductsButtonComponent />
				) : params.tableName === 'buy' ? (
					<BuyButtonComponent />
				) : (
					<TableButtons />
				)}
			</Flex>
		</ScrollArea>
	);
}

export default SidebarComponents;
