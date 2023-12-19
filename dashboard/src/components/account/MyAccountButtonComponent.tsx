import { ActionIcon, Flex, Text } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useComponentStyle } from '../nav/styles/useComponentStyle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setNavigationState } from '../../redux/component/componentSlice';

function MyAccountButtonComponent() {
	const styles = useComponentStyle();
	const dispatch = useDispatch();
	const myAccount = useSelector(
		(state: RootState) => state.component.myAccount
	);

	return (
		<Flex
			w={250}
			onClick={() => dispatch(setNavigationState('myAccount'))}
			sx={{
				...styles.hoverComponent,
				...(myAccount ? { backgroundColor: 'rgba(255, 255, 255, 0.04)' } : {}),
			}}
			align={'center'}
		>
			<ActionIcon variant="transparent">
				<IconUser color="white" size="1.2rem" />
			</ActionIcon>
			<Text fw={500} color="white" fz={15} ml={12}>
				My Account
			</Text>
		</Flex>
	);
}

export default MyAccountButtonComponent;
