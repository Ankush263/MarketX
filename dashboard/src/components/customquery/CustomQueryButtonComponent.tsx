import { ActionIcon, Flex, Text } from '@mantine/core';
import { IconBrandGoogleBigQuery } from '@tabler/icons-react';
import { useComponentStyle } from '../nav/styles/useComponentStyle';
import { useHistory } from 'react-router-dom';

function CustomQueryButtonComponent() {
	const styles = useComponentStyle();
	const history = useHistory();

	return (
		<Flex
			w={250}
			onClick={() => history.push('/custom_query')}
			sx={styles.hoverComponent}
			align={'center'}
		>
			<ActionIcon variant="transparent">
				<IconBrandGoogleBigQuery color="white" size="1.2rem" />
			</ActionIcon>
			<Text fw={500} color="white" fz={15} ml={12}>
				Custom Query
			</Text>
		</Flex>
	);
}

export default CustomQueryButtonComponent;
