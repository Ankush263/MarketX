import { Box, Flex, Loader } from '@mantine/core';
import React, { Suspense } from 'react';
import Nav from '../navbar/Nav';
import DiscountComponent from '../discount/DiscountComponent';
import OfferComponent from '../offer/OfferComponent';
import QualityComponent from '../quality/QualityComponent';
import FooterComponent from '../footer/FooterComponent';
import ProductSkeleton from './ProductSkeleton';

const BestSellerComponent = React.lazy(
	() => import('../bestseller/BestSellerComponent')
);
const CarouselComponent = React.lazy(
	() => import('../carousel/CarouselComponent')
);

function Main() {
	return (
		<Box>
			<Box sx={{ zIndex: 1 }} pos={'absolute'} top={0} left={0} w={'100%'}>
				<Nav />
			</Box>
			<Suspense
				fallback={
					<Flex justify={'center'} align={'center'} w={'100%'} h={'100vh'}>
						<Loader />
					</Flex>
				}
			>
				<CarouselComponent />
			</Suspense>
			<Box>
				<DiscountComponent />
			</Box>
			<Suspense fallback={<ProductSkeleton w={270} h={420} />}>
				<BestSellerComponent />
			</Suspense>
			<Box>
				<OfferComponent />
			</Box>
			<Box>
				<QualityComponent />
			</Box>
			<Box>
				<FooterComponent />
			</Box>
		</Box>
	);
}

export default Main;
