import { Flex } from '@mantine/core';
import MetricesDimensionsBtnComponent from '../../MetricesDimensionsBtnComponent';

function ProductMetricesButton() {
	return (
		<Flex w={'100%'} direction={'column'} align={'center'}>
			<MetricesDimensionsBtnComponent
				tooltipText="Max of created_at"
				name="Date of most recent created product"
				type="number"
				metrices={true}
				table="products"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Min of created_at"
				name="Date of first created product"
				type="number"
				metrices={true}
				table="products"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Total products"
				name="Total number of products"
				type="number"
				metrices={true}
				table="products"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Highest price of the product"
				name="Highest price"
				type="number"
				metrices={true}
				table="products"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Lowest price of the product"
				name="Lowest price"
				type="number"
				metrices={true}
				table="products"
			/>
		</Flex>
	);
}

export default ProductMetricesButton;
