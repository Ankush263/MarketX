import {
	Box,
	Flex,
	Text,
	Image,
	Card,
	Rating,
	Button,
	CloseButton,
	ActionIcon,
	Progress,
} from '@mantine/core';
import React, { useState } from 'react';
import { useCounter } from '@mantine/hooks';
import { IconPlus, IconMinus, IconShoppingBag } from '@tabler/icons-react';
import { itemCardStyles } from './styles/itemCardStyles';

interface ItemCardInterface {
	width: number;
	height: number;
}

function ItemCardComponent({ width, height }: ItemCardInterface) {
	const [mouseHover, setMouseHover] = useState<boolean>(false);
	const [mouseHoverButton, setMouseHoverButton] = useState<boolean>(false);
	const [count, handlers] = useCounter(0, { min: 1, max: 3 });
	const styles = itemCardStyles();

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
				<Text fw={500} size={'12px'} ff={'Josefin Sans'}>
					DRIBBLE
				</Text>
				<Flex justify={'center'} align={'center'} gap={'2px'}>
					<Text fw={550}>$</Text>
					<Text fw={500} size={'25px'}>
						45.00
					</Text>
				</Flex>
			</Flex>
			<Box
				sx={{
					overflow: 'hidden',
				}}
			>
				{mouseHover ? (
					<Image
						src={'/image/pooh2_notBg.webp'}
						alt="product image"
						sx={styles.fImage}
					/>
				) : (
					<Image
						src={'/image/1_2fd6af37-8624-4644-90da-8d4f2a0c548b.webp'}
						alt="product image"
						sx={styles.sImage}
					/>
				)}
			</Box>
			{mouseHover ? (
				<Flex direction={'column'} gap={'xs'}>
					<Text ff={'Josefin Sans'} align="center">
						Bear plush toy
					</Text>
					<Flex justify={'space-between'} align={'center'} w="100%">
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
						color={count === 1 ? 'green' : count === 2 ? 'red' : 'blue'}
					/>
					<Button
						onMouseEnter={() => setMouseHoverButton(true)}
						onMouseLeave={() => setMouseHoverButton(false)}
						w={150}
						radius={'xl'}
						color="dark"
						sx={styles.button}
					>
						{mouseHoverButton ? <IconShoppingBag /> : 'Add To Cart'}
					</Button>
				</Flex>
			) : (
				<Flex direction={'column'} gap={'xs'}>
					<Text ff={'Josefin Sans'}>Bear plush toy</Text>
					<Flex justify={'center'} align={'center'}>
						<Rating defaultValue={3} size="xs" />
						<Text size={12} ff={'Josefin Sans'}>
							(3)
						</Text>
					</Flex>
				</Flex>
			)}
		</Card>
	);
}

export default ItemCardComponent;
