import { Flex, Card, Image, Text, ActionIcon } from '@mantine/core';
import { IconTrash, IconX } from '@tabler/icons-react';
import { removeFromCart } from '../../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface CartItemsInterface {
	productId: number;
	name: string;
	subTotal: number;
	image: string;
	quantity: number;
}

function CartItemCard({
	productId,
	name,
	subTotal,
	image,
	quantity,
}: CartItemsInterface) {
	const token = useSelector((state: RootState) => state.token.value);
	const queryClient = useQueryClient();

	const removeItemFromCart = async () => {
		try {
			const data = await removeFromCart(productId.toString(), token);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const removeItemsFromCartMutation = useMutation({
		mutationFn: removeItemFromCart,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['carts'] });
		},
	});

	return (
		<Flex justify={'space-around'} align={'center'} mb={10}>
			<Card shadow="lg" padding="lg" radius="md" withBorder display={'flex'}>
				<Card.Section>
					<Image src={`${image}`} height={160} alt="Norway" />
				</Card.Section>
				<Flex direction={'column'} justify={'space-between'} ml={50} w={200}>
					<Text fz={18} fw={400}>
						{name}
					</Text>
					<Flex justify={'space-between'}>
						<Text fz={18} fw={400}>
							$ {subTotal}
						</Text>
						<Flex justify={'space-between'} align={'center'} w={40}>
							<IconX size="1.125rem" />
							<Text>{quantity}</Text>
						</Flex>
					</Flex>
				</Flex>
			</Card>
			<ActionIcon
				radius="xl"
				color="dark"
				onClick={() => removeItemsFromCartMutation.mutate()}
			>
				<IconTrash size="1.125rem" />
			</ActionIcon>
		</Flex>
	);
}

export default CartItemCard;
