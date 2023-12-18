import { ActionIcon, Flex, Text } from '@mantine/core';
import { IconCloudUpload } from '@tabler/icons-react';
import { useComponentStyle } from '../nav/styles/useComponentStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setNavigationState } from '../../redux/component/componentSlice';
import { RootState } from '../../redux/store';

function UploadNavButtonComponent() {
	const styles = useComponentStyle();
	const dispatch = useDispatch();
	const uploadProducts = useSelector(
		(state: RootState) => state.component.uploadProducts
	);

	return (
		<Flex
			w={250}
			sx={{
				...styles.hoverComponent,
				...(uploadProducts
					? { backgroundColor: 'rgba(255, 255, 255, 0.04)' }
					: {}),
			}}
			align={'center'}
			onClick={() => dispatch(setNavigationState('uploadProducts'))}
		>
			<ActionIcon variant="transparent">
				<IconCloudUpload color="white" size="1.2rem" />
			</ActionIcon>
			<Text fw={500} color="white" fz={15} ml={12}>
				Upload Product
			</Text>
		</Flex>
	);
}

export default UploadNavButtonComponent;
