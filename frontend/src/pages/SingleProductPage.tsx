import {
	ActionIcon,
	Box,
	Button,
	CloseButton,
	Flex,
	Image,
	Progress,
	Text,
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import Nav from '../components/navbar/Nav';
import { useCallback, useEffect, useState } from 'react';
import { getSingleProduct } from '../api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Product } from '../redux/products/productSlice';
import { IconMinus, IconPlus, IconShoppingBag } from '@tabler/icons-react';
import { useCounter } from '@mantine/hooks';

interface RouteParams {
	productId: string;
}
function SingleProductPage() {
	const { productId } = useParams<RouteParams>();
	const token = useSelector((state: RootState) => state.token.value);
	const [product, setProduct] = useState<Product>();
	const [count, handlers] = useCounter(0, { min: 1, max: 3 });
	const [mouseHoverButton, setMouseHoverButton] = useState<boolean>(false);

	const fetch = useCallback(async () => {
		const product = await getSingleProduct(productId, token);
		console.log(product.data.data.doc);
		setProduct(product.data.data.doc);
	}, [productId, token]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return (
		<Box>
			<Box>
				<Nav />
			</Box>
			<Flex justify={'center'} align={'center'} mt={50}>
				<Box w={400} h={500}>
					<Image src={product?.image[0]} />
				</Box>
				<Flex w={600} h={500} direction={'column'}>
					<Text fw={400} fz={27} ff={'Josefin Sans'} align="start">
						{product?.name}
					</Text>
					<Text fw={400} fz={30} ff={'Josefin Sans'} align="start" mt={10}>
						${product?.price}
					</Text>
					<Text fz={12}>Tax included</Text>
					<Text fz={22} ff={'Josefin Sans'} mt={30} fw={500}>
						Short description
					</Text>
					<Text fz={15} ff={'Josefin Sans'} mt={10}>
						{product?.description}
					</Text>
					<Text ff={'Josefin Sans'} mt={30} fw={600}>
						Product Type:{' '}
						<Text span fw={400}>
							{product?.type}
						</Text>
					</Text>
					<Text ff={'Josefin Sans'} fw={600}>
						Tags:{' '}
						<Text span fw={400}>
							{product?.tags}
						</Text>
					</Text>
					<Text ff={'Josefin Sans'} fw={600}>
						Weight:{' '}
						<Text span fw={400}>
							{product?.weight}
						</Text>
					</Text>
					<Text ff={'Josefin Sans'} fw={600}>
						Vendor:{' '}
						<Text span fw={400}>
							{product?.company}
						</Text>
					</Text>
					<Flex>
						<Flex direction={'column'}>
							<Flex justify={'space-between'} align={'center'} w={100}>
								<ActionIcon onClick={handlers.decrement}>
									<IconMinus size="1.125rem" />
								</ActionIcon>
								<Text>{count}</Text>
								{count === 3 ? (
									<CloseButton aria-label="Close modal" disabled />
								) : (
									<ActionIcon onClick={handlers.increment}>
										<IconPlus size="1.125rem" />
									</ActionIcon>
								)}
							</Flex>
							<Progress
								value={34 * count}
								size="xs"
								w={100}
								color={count === 1 ? 'green' : count === 2 ? 'red' : 'blue'}
							/>
						</Flex>
						<Button
							onMouseEnter={() => setMouseHoverButton(true)}
							onMouseLeave={() => setMouseHoverButton(false)}
							w={150}
							radius={'xl'}
							ml={20}
							color="dark"
							fz={12}
						>
							{mouseHoverButton ? <IconShoppingBag /> : 'Add To Cart'}
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	);
}

export default SingleProductPage;
