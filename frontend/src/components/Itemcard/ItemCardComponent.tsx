import { Box, Flex, Text, Image, Card, Rating } from '@mantine/core';
import { useState } from 'react';
import { useItemCardStyles } from './styles/useitemCardStyles';
import { Product } from '../../redux/products/productSlice';
import { useHistory } from 'react-router-dom';
import AddToCartButton from '../cart/AddToCartButton';

interface ItemCardInterface {
	width: number;
	height: number;
	product: Product;
}

function ItemCardComponent({ width, height, product }: ItemCardInterface) {
	const [mouseHover, setMouseHover] = useState<boolean>(false);
	const styles = useItemCardStyles();
	const history = useHistory();

	const handleClick = (id: number) => {
		history.push(`/products/product/${id}`);
	};

	return (
		<Card
			onMouseEnter={() => setMouseHover(true)}
			onMouseLeave={() => setMouseHover(false)}
			sx={styles.card}
			w={width}
			h={height}
			radius="xl"
			withBorder
		>
			<Flex justify="space-between" align={'center'} w={'100%'} h={40}>
				<Text fw={500} size={'15px'} ff={'Josefin Sans'}>
					{product?.company}
				</Text>
				<Flex justify={'center'} align={'center'} gap={'2px'}>
					<Text fw={550}>$</Text>
					<Text fw={500} size={'25px'}>
						{product?.price}
					</Text>
				</Flex>
			</Flex>
			<Box
				sx={{
					overflow: 'hidden',
					cursor: 'pointer',
				}}
				onClick={() => handleClick(product?.id)}
			>
				<Image src={product?.image[0]} alt="product image" sx={styles.sImage} />
			</Box>
			{mouseHover ? (
				<Flex direction={'column'} gap={'xs'}>
					<Text ff={'Josefin Sans'} align="center">
						{product?.name}
					</Text>
					<AddToCartButton product={product && product} />
				</Flex>
			) : (
				<Flex direction={'column'} gap={'xs'}>
					<Text ff={'Josefin Sans'}>{product?.name}</Text>
					<Flex justify={'center'} align={'center'}>
						<Rating defaultValue={3} size="xs" />
						<Text size={12} ff={'Josefin Sans'}>
							({product?.ratings})
						</Text>
					</Flex>
				</Flex>
			)}
		</Card>
	);
}

export default ItemCardComponent;
