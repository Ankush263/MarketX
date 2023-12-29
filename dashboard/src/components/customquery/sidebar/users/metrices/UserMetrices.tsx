import { Flex } from '@mantine/core';
import MetricesDimensionsBtnComponent from '../../MetricesDimensionsBtnComponent';

function UserMetrices() {
	return (
		<Flex w={'100%'} direction={'column'} align={'center'} mb={10}>
			<MetricesDimensionsBtnComponent
				tooltipText="Max of created_at"
				name="Date of most recent created user"
				type="number"
				metrices={true}
				table="users"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Min of created_at"
				name="Date of first created user"
				type="number"
				metrices={true}
				table="users"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Unique users"
				name="Unique user count"
				type="number"
				metrices={true}
				table="users"
			/>
		</Flex>
	);
}

export default UserMetrices;
