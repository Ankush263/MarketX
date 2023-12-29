import { Flex } from '@mantine/core';
import MetricesDimensionsBtnComponent from '../../MetricesDimensionsBtnComponent';

function UserDimensionButton() {
	return (
		<Flex w={'100%'} direction={'column'} align={'center'}>
			<MetricesDimensionsBtnComponent
				tooltipText="Users Id"
				name="User Id"
				type="number"
				metrices={false}
				table="users"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Users username"
				name="username"
				type="string"
				metrices={false}
				table="users"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Users email"
				name="email"
				type="string"
				metrices={false}
				table="users"
			/>
		</Flex>
	);
}

export default UserDimensionButton;
