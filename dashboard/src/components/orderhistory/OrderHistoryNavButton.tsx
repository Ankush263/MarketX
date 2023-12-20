import { ActionIcon, Flex, Text } from '@mantine/core';
import { IconHistory } from '@tabler/icons-react';
import { useComponentStyle } from '../nav/styles/useComponentStyle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setNavigationState } from '../../redux/component/componentSlice';

function OrderHistoryNavButton() {
	const styles = useComponentStyle();
	const dispatch = useDispatch();
	const orderHistory = useSelector(
		(state: RootState) => state.component.orderHistory
	);

	return (
		<Flex
			w={250}
			align={'center'}
			onClick={() => dispatch(setNavigationState('orderHistory'))}
			sx={{
				...styles.hoverComponent,
				...(orderHistory
					? { backgroundColor: 'rgba(255, 255, 255, 0.04)' }
					: {}),
			}}
		>
			<ActionIcon variant="transparent">
				<IconHistory color="white" size="1.2rem" />
			</ActionIcon>
			<Text fw={500} color="white" fz={15} ml={12}>
				Order History
			</Text>
		</Flex>
	);
}

export default OrderHistoryNavButton;
