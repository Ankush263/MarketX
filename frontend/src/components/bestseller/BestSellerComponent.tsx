import { Text, Grid, Flex } from '@mantine/core';
import ItemCardComponent from '../Itemcard/ItemCardComponent';
import { getTopFourProducts } from '../../api';
import { useQuery } from '@tanstack/react-query';
import { ProductInterface } from '../../interface';

function BestSellerComponent() {
	const fetch = async () => {
		const allProducts = await getTopFourProducts();
		return allProducts.data.data.products;
	};

	const query = useQuery({ queryKey: ['top-4-products'], queryFn: fetch });

	return (
		<Flex direction={'column'} align={'center'} mt="50px">
			<Text
				fz={'25px'}
				fw={550}
				ff={'Josefin Sans'}
				mb={30}
				onClick={() => console.log(query.data)}
			>
				Our Best Sellers
			</Text>
			<Grid maw={'100%'} w="80%" gutter={'xl'}>
				{query?.data?.map((product: ProductInterface) => {
					return (
						<Grid.Col md={6} lg={3} key={product?.name}>
							<ItemCardComponent width={270} height={420} product={product} />
						</Grid.Col>
					);
				})}
			</Grid>
		</Flex>
	);
}

export default BestSellerComponent;
