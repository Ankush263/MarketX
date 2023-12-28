import { Flex, Tooltip, Text } from '@mantine/core';
import { Icon123, IconAbc, IconInfoCircle } from '@tabler/icons-react';
import { useState } from 'react';

interface Button {
	tooltipText: string;
	name: string;
	type: string;
	metrices: boolean;
}

function MetricesDimensionsBtnComponent({
	tooltipText,
	name,
	type,
	metrices,
}: Button) {
	const [hover, setHover] = useState<boolean>(false);
	return (
		<Flex
			w={'85%'}
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
		>
			{type === 'string' ? (
				<IconAbc color={metrices ? '#228be6' : '#deb821'} size={'1.4rem'} />
			) : (
				<Icon123 color={metrices ? '#228be6' : '#deb821'} size={'1.4rem'} />
			)}

			<Text c={'white'} fz={15} ml={20}>
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

export default MetricesDimensionsBtnComponent;
