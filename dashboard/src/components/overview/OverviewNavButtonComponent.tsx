import { ActionIcon, Flex, Text } from '@mantine/core';
import { IconChartBar } from '@tabler/icons-react';
import { useComponentStyle } from '../nav/styles/useComponentStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setNavigationState } from '../../redux/component/componentSlice';
import { RootState } from '../../redux/store';

function OverviewNavButtonComponent() {
	const styles = useComponentStyle();
	const dispatch = useDispatch();
	const overview = useSelector((state: RootState) => state.component.overview);

	return (
		<Flex
			w={250}
			sx={{
				...styles.hoverComponent,
				...(overview ? { backgroundColor: 'rgba(255, 255, 255, 0.04)' } : {}),
			}}
			align={'center'}
			onClick={() => dispatch(setNavigationState('overview'))}
		>
			<ActionIcon variant="transparent">
				<IconChartBar color="white" size="1.2rem" />
			</ActionIcon>
			<Text fw={500} color="white" fz={15} ml={12}>
				Overview
			</Text>
		</Flex>
	);
}

export default OverviewNavButtonComponent;
