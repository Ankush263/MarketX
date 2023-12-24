import { Flex, Text, Button, Divider, TextInput, Loader } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { setNavigationState } from '../redux/component/componentSlice';
import { useDispatch } from 'react-redux';
import ProductComponent from './product/ProductComponent';
import { getMyProducts } from '../api';
import { getToken } from '../token';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export interface Product {
	id: number;
	image: string;
	name: string;
	description: string;
	price: number;
	weight: string;
	company: string;
	tags: string[];
	type: string;
}

function MyProdcutsComponent() {
	const [products, setProducts] = useState<Product[]>([
		{
			id: 0,
			image: '',
			name: '',
			description: '',
			price: 0,
			weight: '',
			company: '',
			tags: [''],
			type: '',
		},
	]);
	const dispatch = useDispatch();
	const token = getToken();

	const handleGetProducts = async () => {
		try {
			const myProducts = await getMyProducts(token);
			setProducts(myProducts.data.data.doc);
			return myProducts.data.data.doc;
		} catch (error) {
			console.log(error);
		}
	};

	const query = useQuery({
		queryKey: ['products'],
		queryFn: handleGetProducts,
	});

	return (
		<Flex direction={'column'} align={'center'}>
			<Flex w={'93%'} justify={'space-between'} align={'center'} mt={100}>
				<Text color="white" c={'white'} fw={500} fz={35}>
					Products
				</Text>
				<Button
					radius={'md'}
					leftIcon={<IconPlus size={'1.1rem'} />}
					onClick={() => dispatch(setNavigationState('uploadProducts'))}
					fz={14}
				>
					Add
				</Button>
			</Flex>
			<Divider w={'93%'} mt={30} mb={30} />

			<Flex
				w={'93%'}
				bg={'rgba(35, 48, 68)'}
				mb={50}
				sx={{ borderRadius: '10px' }}
				direction={'column'}
			>
				<TextInput
					placeholder="Search by product name"
					icon={<IconSearch size="1.5rem" />}
					size="md"
					mb={30}
				/>
				<Flex
					justify={'center'}
					bg={'rgba(225, 225 ,225, 0.09)'}
					py={10}
					mb={10}
				>
					<Flex justify={'space-around'} align={'center'} w={'85%'} ml={155}>
						<Text c={'white'} fw={500}>
							Name
						</Text>
						<Text c={'white'} fw={500}>
							price
						</Text>
						<Text c={'white'} fw={500}>
							Weight
						</Text>
						<Text c={'white'} fw={500}>
							Tags
						</Text>
						<Text c={'white'} fw={500}>
							Company
						</Text>
					</Flex>
				</Flex>

				{query.isLoading ? (
					<Flex justify={'center'} align={'center'} mt={50} mb={50}>
						<Loader variant="dots" />
					</Flex>
				) : (
					products.map((product: Product) => {
						return (
							<ProductComponent
								key={product.id}
								image={product.image[0]}
								name={product.name}
								description={product.description}
								price={product.price}
								weight={product.weight}
								company={product.weight}
								tags={product.tags}
								type={product.type}
								id={product.id}
							/>
						);
					})
				)}
			</Flex>
		</Flex>
	);
}

export default MyProdcutsComponent;
