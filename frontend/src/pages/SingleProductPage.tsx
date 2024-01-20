import { Box, Flex, Image, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import Nav from '../components/navbar/Nav';
import { useCallback, useState } from 'react';
import { getSingleProduct } from '../api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Product } from '../redux/products/productSlice';
import AddToCartButton from '../components/cart/AddToCartButton';
import { useQuery } from '@tanstack/react-query';

interface RouteParams {
	productId: string;
}
function SingleProductPage() {
	const { productId } = useParams<RouteParams>();
	const token = useSelector((state: RootState) => state.token.value);
	const [product, setProduct] = useState<Product>();

	const fetch = useCallback(async () => {
		const product = await getSingleProduct(productId, token);
		setProduct(product.data.data.doc);
		return product.data.data.doc;
	}, [productId, token]);

	const fetchSingleProducts = useQuery({
		queryKey: ['single-product'],
		queryFn: fetch,
		retry: 10,
	});

	return (
		<Box>
			<Box>
				<Nav />
			</Box>
			<Flex justify={'center'} align={'center'} mt={50}>
				<Box w={400} h={500}>
					{fetchSingleProducts.isSuccess && <Image src={product?.image[0]} />}
				</Box>
				<Flex w={600} h={500} direction={'column'}>
					<Text fw={400} fz={27} ff={'Josefin Sans'} align="start">
						{fetchSingleProducts.isSuccess && product?.name}
					</Text>
					<Text fw={400} fz={30} ff={'Josefin Sans'} align="start" mt={10}>
						${fetchSingleProducts.isSuccess && product?.price}
					</Text>
					<Text fz={12}>Tax included</Text>
					<Text fz={22} ff={'Josefin Sans'} mt={30} fw={500}>
						Short description
					</Text>
					<Text fz={15} ff={'Josefin Sans'} mt={10}>
						{fetchSingleProducts.isSuccess && product?.description}
					</Text>
					<Text ff={'Josefin Sans'} mt={30} fw={600}>
						Product Type:{' '}
						<Text span fw={400}>
							{fetchSingleProducts.isSuccess && product?.type}
						</Text>
					</Text>
					<Text ff={'Josefin Sans'} fw={600}>
						Tags:{' '}
						<Text span fw={400}>
							{fetchSingleProducts.isSuccess && product?.tags}
						</Text>
					</Text>
					<Text ff={'Josefin Sans'} fw={600}>
						Weight:{' '}
						<Text span fw={400}>
							{fetchSingleProducts.isSuccess && product?.weight}
						</Text>
					</Text>
					<Text ff={'Josefin Sans'} fw={600}>
						Vendor:{' '}
						<Text span fw={400}>
							{fetchSingleProducts.isSuccess && product?.company}
						</Text>
					</Text>
					<Flex>
						{fetchSingleProducts.isSuccess && (
							<AddToCartButton product={product && product} />
						)}
					</Flex>
				</Flex>
			</Flex>
		</Box>
	);
}

export default SingleProductPage;
