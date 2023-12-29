import { Flex } from '@mantine/core';
import MetricesDimensionsBtnComponent from '../../MetricesDimensionsBtnComponent';

function ProductsDimensionButton() {
	return (
		<Flex w={'100%'} direction={'column'} align={'center'}>
			<MetricesDimensionsBtnComponent
				tooltipText="Products Id"
				name="Product Id"
				type="number"
				metrices={false}
				table="products"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Products name"
				name="name"
				type="string"
				metrices={false}
				table="products"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Products company"
				name="company"
				type="string"
				metrices={false}
				table="products"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Products price"
				name="price"
				type="number"
				metrices={false}
				table="products"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Products type"
				name="type"
				type="string"
				metrices={false}
				table="products"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Products tags"
				name="tag"
				type="string"
				metrices={false}
				table="products"
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Products weight"
				name="weight"
				type="number"
				metrices={false}
				table="products"
			/>
		</Flex>
	);
}

export default ProductsDimensionButton;
