import MetricesDimensionsBtnComponent from '../../MetricesDimensionsBtnComponent';
import { Flex } from '@mantine/core';

function BuyDimensionComponent() {
	return (
		<Flex w={'100%'} direction={'column'} align={'center'}>
			<MetricesDimensionsBtnComponent
				tooltipText="Unique Transaction Id"
				name="transaction id"
				type="string"
				metrices={true}
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Order Quantity"
				name="quantity"
				type="number"
				metrices={true}
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Order Sub total"
				name="sub_total"
				type="number"
				metrices={true}
			/>
		</Flex>
	);
}

export default BuyDimensionComponent;
