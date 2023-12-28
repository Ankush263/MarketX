import { Flex } from '@mantine/core';
import MetricesDimensionsBtnComponent from '../../MetricesDimensionsBtnComponent';

function ProductsDimensionButton() {
	return (
		<Flex w={'100%'} direction={'column'} align={'center'}>
			<MetricesDimensionsBtnComponent
				tooltipText="Products Id"
				name="Id"
				type="number"
				metrices={true}
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Products name"
				name="name"
				type="string"
				metrices={true}
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Products company"
				name="company"
				type="string"
				metrices={true}
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Products price"
				name="price"
				type="number"
				metrices={true}
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Products type"
				name="type"
				type="string"
				metrices={true}
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Products tags"
				name="tag"
				type="string"
				metrices={true}
			/>
			<MetricesDimensionsBtnComponent
				tooltipText="Products weight"
				name="weight"
				type="number"
				metrices={true}
			/>
		</Flex>
	);
}

export default ProductsDimensionButton;
