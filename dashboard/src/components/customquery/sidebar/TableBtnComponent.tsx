import { Flex, Tooltip, Text } from '@mantine/core';
import { IconInfoCircle, IconTable } from '@tabler/icons-react';
import { useState } from 'react';

interface Button {
	name: string;
	tooltipText: string;
}

function TableBtnComponent({ name, tooltipText }: Button) {
	const [hover, setHover] = useState<boolean>();

	return (
		<Flex
			w={'85%'}
			mt={10}
			p={6}
			sx={{
				':hover': {
					backgroundColor: 'rgb(27, 38, 53)',
					cursor: 'pointer',
				},
			}}
			align={'center'}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			// onClick={() => history.push('/custom_query/products')}
		>
			<IconTable color="white" />
			<Text c={'white'} fz={15} ml={10}>
				{name}
			</Text>
			<Flex ml={'auto'}>
				{hover && (
					<Tooltip
						label={tooltipText}
						position="right"
						pos={'fixed'}
						withArrow
						c={'black'}
						color="gray"
					>
						<IconInfoCircle color="white" size={'1.3rem'} />
					</Tooltip>
				)}
			</Flex>
		</Flex>
	);
}

export default TableBtnComponent;
