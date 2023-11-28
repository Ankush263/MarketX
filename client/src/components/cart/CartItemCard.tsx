import {
	Flex,
	Card,
	Image,
	Text,
	ActionIcon,
	CloseButton,
} from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import React from 'react';

function CartItemCard() {
	const [count, handlers] = useCounter(0, { min: 1, max: 3 });

	return (
		<Flex justify={'space-around'} align={'center'} mb={10}>
			<Card shadow="lg" padding="lg" radius="md" withBorder display={'flex'}>
				<Card.Section>
					<Image
						src="/image/1_2fd6af37-8624-4644-90da-8d4f2a0c548b.webp"
						height={160}
						alt="Norway"
					/>
				</Card.Section>
				<Flex direction={'column'} justify={'space-between'} ml={50} w={200}>
					<Text fz={18} fw={400}>
						Bear Plush Toy
					</Text>
					<Flex justify={'space-between'}>
						<Text fz={18} fw={400}>
							$ 38.60
						</Text>
						<Flex justify={'space-between'} align={'center'} w={100}>
							<ActionIcon onClick={handlers.decrement}>
								<IconMinus size="1.125rem" />
							</ActionIcon>
							<Text fz={15}>{count}</Text>
							{count === 3 ? (
								<CloseButton aria-label="Close modal" disabled />
							) : (
								<ActionIcon onClick={handlers.increment}>
									<IconPlus size="1.125rem" />
								</ActionIcon>
							)}
						</Flex>
					</Flex>
				</Flex>
			</Card>
			<ActionIcon radius="xl" color="dark">
				<IconTrash size="1.125rem" />
			</ActionIcon>
		</Flex>
	);
}

export default CartItemCard;
