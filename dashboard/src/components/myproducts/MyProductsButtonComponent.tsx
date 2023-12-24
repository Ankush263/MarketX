import { ActionIcon, Flex, Text } from '@mantine/core';
import { IconClipboardList } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useComponentStyle } from '../nav/styles/useComponentStyle';
import { RootState } from '../../redux/store';
import { setNavigationState } from '../../redux/component/componentSlice';

function MyProductsButtonComponent() {
	const styles = useComponentStyle();
	const dispatch = useDispatch();
	const myProducts = useSelector(
		(state: RootState) => state.component.myProduct
	);

	return (
		<Flex
			w={250}
			sx={{
				...styles.hoverComponent,
				...(myProducts ? { backgroundColor: 'rgba(255, 255, 255, 0.04)' } : {}),
			}}
			align={'center'}
			onClick={() => dispatch(setNavigationState('myProduct'))}
		>
			<ActionIcon variant="transparent">
				<IconClipboardList color="white" size="1.2rem" />
			</ActionIcon>
			<Text fw={500} color="white" fz={15} ml={12}>
				My Products
			</Text>
		</Flex>
	);
}

export default MyProductsButtonComponent;
