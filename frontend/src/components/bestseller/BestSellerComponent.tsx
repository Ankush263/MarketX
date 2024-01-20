import { Text, Grid, Flex } from '@mantine/core';
import ItemCardComponent from '../Itemcard/ItemCardComponent';
import { getTopFourProducts } from '../../api';
import { useQuery } from '@tanstack/react-query';
import { ProductInterface } from '../../interface';
import ProductSkeleton from '../main/ProductSkeleton';

function BestSellerComponent() {
	const fetch = async () => {
		const allProducts = await getTopFourProducts();
		return allProducts?.data?.data.products;
	};

	const query = useQuery({ queryKey: ['top-4-products'], queryFn: fetch });

	return (
		<Flex direction={'column'} align={'center'} mt="50px">
			<Text fz={'25px'} fw={550} ff={'Josefin Sans'} mb={30}>
				Our Best Sellers
			</Text>
			{query.isLoading && (
				<Grid maw={'100%'} w="80%" gutter={'xl'}>
					<Grid.Col md={6} lg={3}>
						<ProductSkeleton w={70} h={420} />
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						<ProductSkeleton w={70} h={420} />
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						<ProductSkeleton w={70} h={420} />
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						<ProductSkeleton w={70} h={420} />
					</Grid.Col>
				</Grid>
			)}
			{query.isError && (
				<Grid maw={'100%'} w="80%" gutter={'xl'}>
					<Grid.Col md={6} lg={3}>
						<ProductSkeleton w={70} h={420} />
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						<ProductSkeleton w={70} h={420} />
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						<ProductSkeleton w={70} h={420} />
					</Grid.Col>
					<Grid.Col md={6} lg={3}>
						<ProductSkeleton w={70} h={420} />
					</Grid.Col>
				</Grid>
			)}
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
