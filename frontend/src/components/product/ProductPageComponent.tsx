import { Flex, Grid, Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { getProducts } from '../../api';
import { setProductAction } from '../../redux/products/productSlice';
import { useDispatch } from 'react-redux';
import React from 'react';
import { ProductInterface } from '../../interface';

const ItemCardComponent = React.lazy(
	() => import('../Itemcard/ItemCardComponent')
);

function ProductPageComponent() {
	const dispatch = useDispatch();

	const fetch = async () => {
		try {
			const product = await getProducts();
			dispatch(setProductAction(product.data.data.doc));
			return product.data.data.doc;
		} catch (error) {
			console.log('Site Error', error);
		}
	};

	const fetchProductsQuery = useQuery({
		queryKey: ['all-products'],
		queryFn: fetch,
	});

	return (
		<Grid>
			{fetchProductsQuery.isSuccess &&
				fetchProductsQuery.data?.map((product: ProductInterface) => {
					return (
						<Grid.Col md={6} lg={4} key={product.id}>
							<Suspense
								fallback={
									<Flex
										justify={'center'}
										align={'center'}
										w={'100%'}
										h={'100vh'}
									>
										<Loader />
									</Flex>
								}
							>
								<ItemCardComponent width={380} height={620} product={product} />
							</Suspense>
						</Grid.Col>
					);
				})}
		</Grid>
	);
}

export default ProductPageComponent;
