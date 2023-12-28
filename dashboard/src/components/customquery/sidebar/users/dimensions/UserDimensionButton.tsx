import { Flex } from '@mantine/core';
import MetricesDimensionsBtnComponent from '../../MetricesDimensionsBtnComponent';

function UserDimensionButton() {
	return (
		<Flex w={'100%'} direction={'column'} align={'center'}>
			<MetricesDimensionsBtnComponent
				tooltipText="Users Id"
				name="Id"
				type="number"
				metrices={true}
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Users username"
				name="username"
				type="string"
				metrices={true}
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Users email"
				name="email"
				type="string"
				metrices={true}
			/>
		</Flex>
	);
}

export default UserDimensionButton;
