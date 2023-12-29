import { Flex, Tooltip, Text } from '@mantine/core';
import { Icon123, IconAbc, IconInfoCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToValue,
	removeFromValue,
} from '../../../redux/dimensionAndMatrices/dimensionAndMatricesSlice';
import { RootState } from '../../../redux/store';

interface Button {
	tooltipText: string;
	name: string;
	type: string;
	metrices: boolean;
	table: string;
}

interface Item {
	name: string;
	metrices: boolean;
	table: string;
}

function MetricesDimensionsBtnComponent({
	tooltipText,
	name,
	type,
	metrices,
	table,
}: Button) {
	const [hover, setHover] = useState<boolean>(false);
	const dispatch = useDispatch();
	const metricesAndDimensions = useSelector(
		(state: RootState) => state.dimensionAndMetrices.value
	);

	const isTextInArray = (
		array: Item[],
		nameToFind: string,
		metricesToFind: boolean
	): boolean => {
		return array.some(
			(item) => item.name === nameToFind && item.metrices === metricesToFind
		);
	};
	const foundItem = isTextInArray(metricesAndDimensions, name, metrices);

	const handleClick = () => {
		if (foundItem) {
			dispatch(removeFromValue(name));
		} else {
			dispatch(addToValue({ name, metrices, table }));
		}
	};

	return (
		<Flex
			w={'85%'}
			p={6}
			sx={{
				':hover': {
					backgroundColor: 'rgb(27, 38, 53)',
					cursor: 'pointer',
					borderRadius: '10px',
				},
				...(foundItem ? { backgroundColor: 'rgba(255, 255, 255, 0.09)' } : {}),
			}}
			align={'center'}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={handleClick}
		>
			{type === 'string' ? (
				<IconAbc color={metrices ? '#deb821' : '#228be6'} size={'1.4rem'} />
			) : (
				<Icon123 color={metrices ? '#deb821' : '#228be6'} size={'1.4rem'} />
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
