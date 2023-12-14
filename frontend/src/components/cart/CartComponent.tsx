import {
	ActionIcon,
	Box,
	Drawer,
	Flex,
	Text,
	ScrollArea,
	Button,
	Checkbox,
} from '@mantine/core';
import {
	IconShoppingBag,
	IconShoppingCartPlus,
	IconTrash,
} from '@tabler/icons-react';
import CartItemCard from './CartItemCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyCartItems, getTotal, deleteCartByUserId } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CartItemInterface } from '../../interface';
import { setOpenCart } from '../../redux/cart/cartSlice';
import { useHistory } from 'react-router-dom';

function CartComponent() {
	const token = useSelector((state: RootState) => state.token.value);
	const cartOpene = useSelector((state: RootState) => state.cart.value);
	const dispatch = useDispatch();
	const history = useHistory();
	const queryClient = useQueryClient();

	const fetchCartItems = async () => {
		try {
			const data = await getMyCartItems(token);
			const cartItems = data.data.data.cart;
			return cartItems;
		} catch (error) {
			console.log(error);
		}
	};
	const query = useQuery({
		queryKey: ['carts'],
		queryFn: fetchCartItems,
	});

	const getTotalAmount = async () => {
		try {
			const data = await getTotal(token);
			return data.data.data.total.totalAmount;
		} catch (error) {
			console.log(error);
		}
	};

	const getTotalQuery = useQuery({
		queryKey: ['total'],
		queryFn: getTotalAmount,
	});

	const handleAddMoreProduct = () => {
		dispatch(setOpenCart(false));
		history.push('/products');
	};

	const handleClearCart = async () => {
		try {
			const data = await deleteCartByUserId(token);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const clearCartQuery = useMutation({
		mutationFn: handleClearCart,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['carts'] });
		},
	});

	const handleCartOpen = () => {
		getTotalQuery.refetch();
		return cartOpene;
	};

	return (
		<Box>
			<Box>
				<ActionIcon
					color="dark"
					size="xl"
					variant="transparent"
					onClick={() => dispatch(setOpenCart(true))}
				>
					<IconShoppingCartPlus size="1.625rem" />
				</ActionIcon>
			</Box>
			<Drawer
				opened={handleCartOpen()}
				onClose={() => dispatch(setOpenCart(false))}
				overlayProps={{ opacity: 0.5, blur: 4 }}
				position="right"
				size={'lg'}
			>
				<Flex direction={'column'} justify={'center'} align={'center'}>
					<Box w={'85%'}>
						<Text fz={25} fw={600}>
							Shopping Cart
						</Text>
					</Box>
					<Box>
						<ScrollArea h={400} scrollHideDelay={500} w={500} mt={20}>
							{query.data?.length === 0 ? (
								<Flex
									justify={'center'}
									align={'center'}
									h={'400px'}
									direction={'column'}
								>
									<IconShoppingBag size={'150px'} color="#d4d7d9" />
									<Text fw={700} fz={19}>
										Your cart is empty
									</Text>
									<Text fz={12}>You have not added any products yet.</Text>
								</Flex>
							) : (
								query.data?.map((i: CartItemInterface) => {
									return (
										<Box key={i.id}>
											<CartItemCard
												productId={i.productid}
												name={i.name}
												subTotal={i.subTotal}
												image={i.image[0]}
												quantity={i.quantity}
											/>
										</Box>
									);
								})
							)}
						</ScrollArea>
					</Box>
					<Flex w={'85%'} justify={'end'} mt={10}>
						<Text fz={18} fw={700}>
							SUBTOTAL ${getTotalQuery?.data ? getTotalQuery?.data : 0} USD
						</Text>
					</Flex>
					<Flex mt={40} w={'75%'} justify={'space-between'} align={'center'}>
						<Button
							uppercase
							radius={'xl'}
							w={'45%'}
							h={40}
							color="gray"
							fz={12}
							onClick={handleAddMoreProduct}
						>
							add more products
						</Button>
						<Button
							uppercase
							radius={'xl'}
							w={'45%'}
							h={40}
							color="dark"
							fz={12}
							disabled={!getTotalQuery?.data}
						>
							check out
						</Button>
					</Flex>
					<Flex mt={30} w={'85%'} justify={'space-between'} align={'center'}>
						<Flex>
							<ActionIcon size={'sm'} onClick={() => clearCartQuery.mutate()}>
								<IconTrash />
							</ActionIcon>
							<Text fz={15}>Clear cart</Text>
						</Flex>
						<Checkbox label="I agree to the store policy" size={'xs'} />
					</Flex>
				</Flex>
			</Drawer>
		</Box>
	);
}

export default CartComponent;
