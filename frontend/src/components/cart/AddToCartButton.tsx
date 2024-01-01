import { Button } from '@mantine/core';
import { IconShoppingBag } from '@tabler/icons-react';
import { useState } from 'react';
import { useButtonStyle } from './styles/useButtonStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenCart } from '../../redux/cart/cartSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart } from '../../api';
import { RootState } from '../../redux/store';
import { Product } from '../../redux/products/productSlice';
import { callWarningNotification } from '../../notification';

interface CartProduct {
	product: Product | undefined;
}

function AddToCartButton({ product }: CartProduct) {
	const [mouseHoverButton, setMouseHoverButton] = useState<boolean>(false);
	const token = useSelector((state: RootState) => state.token.value);
	const styles = useButtonStyle();
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const addMutation = async (productId: number) => {
		try {
			const data = await addToCart(productId.toString(), token);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const addToCartMutation = useMutation({
		mutationFn: addMutation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['carts'] });
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const handleAddToCart = async () => {
		try {
			if (!token) {
				callWarningNotification(
					`You aren't logged in, please log in to get access`
				);
				return;
			}
			dispatch(setOpenCart(true));
			if (product && product.id) {
				addToCartMutation.mutate(product.id);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Button
			onMouseEnter={() => setMouseHoverButton(true)}
			onMouseLeave={() => setMouseHoverButton(false)}
			onClick={handleAddToCart}
			w={150}
			radius={'xl'}
			color="dark"
			sx={styles.button}
		>
			{mouseHoverButton ? <IconShoppingBag /> : 'Add To Cart'}
		</Button>
	);
}

export default AddToCartButton;
