import MetricesDimensionsBtnComponent from '../../MetricesDimensionsBtnComponent';
import { Flex } from '@mantine/core';

function BuyMetricesComponent() {
	return (
		<Flex w={'100%'} direction={'column'} align={'center'}>
			<MetricesDimensionsBtnComponent
				tooltipText="Max of created_at"
				name="Date of most recent Order"
				type="number"
				metrices={true}
				table="buy"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Min of created_at"
				name="Date of first Order"
				type="number"
				metrices={true}
				table="buy"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Unique orders based on products & users"
				name="Unique Orders"
				type="number"
				metrices={true}
				table="buy"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Total transaction"
				name="Total number of transaction"
				type="number"
				metrices={true}
				table="buy"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Total ordered products"
				name="Total quantity of ordered products"
				type="number"
				metrices={true}
				table="buy"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Total users number"
				name="Total number of users orders"
				type="number"
				metrices={true}
				table="buy"
			/>
		</Flex>
	);
}

export default BuyMetricesComponent;
