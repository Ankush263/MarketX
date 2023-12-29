import MetricesDimensionsBtnComponent from '../../MetricesDimensionsBtnComponent';
import { Flex } from '@mantine/core';

function BuyDimensionComponent() {
	return (
		<Flex w={'100%'} direction={'column'} align={'center'}>
			<MetricesDimensionsBtnComponent
				tooltipText="Unique Transaction Id"
				name="transaction id"
				type="string"
				metrices={false}
				table="buy"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Order Quantity"
				name="quantity"
				type="number"
				metrices={false}
				table="buy"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Order Sub total"
				name="sub_total"
				type="number"
				metrices={false}
				table="buy"
			/>
		</Flex>
	);
}

export default BuyDimensionComponent;
