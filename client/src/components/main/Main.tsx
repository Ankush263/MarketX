import { Box } from '@mantine/core';
import React from 'react';
import Nav from '../navbar/Nav';
import DiscountComponent from '../discount/DiscountComponent';
import BestSellerComponent from '../bestseller/BestSellerComponent';
import OfferComponent from '../offer/OfferComponent';
import QualityComponent from '../quality/QualityComponent';
import FooterComponent from '../footer/FooterComponent';
import CarouselComponent from '../carousel/CarouselComponent';

function Main() {
	return (
		<Box>
			<Box sx={{ zIndex: 1 }} pos={'absolute'} top={0} left={0} w={'100%'}>
				<Nav />
			</Box>
			<Box>
				<CarouselComponent />
			</Box>
			<Box>
				<DiscountComponent />
			</Box>
			<Box>
				<BestSellerComponent />
			</Box>
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
