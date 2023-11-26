import { Box, Flex, Image } from '@mantine/core';
import React from 'react';
import DiscountText from '../discount/DiscountText';
import { offerStyles } from './styles/offerStyles';

function OfferComponent() {
	const styles = offerStyles();

	return (
		<Flex justify={'center'}>
			<Flex
				mt={100}
				mb={100}
				justify={'space-between'}
				align={'center'}
				w="80%"
			>
				<Box sx={styles.leftImageBox} w={590}>
					<Image
						src="/image/banner-04_911bbaf5-c4c3-4dfd-b591-31cf2f020e91.webp"
						radius="lg"
						alt="banner-01"
						maw={590}
						sx={styles.leftImage}
					/>
					<DiscountText
						smallText="Special Offer"
						bigText="Stuffed Toy"
						buttonText="Shop now"
						bottom={-1650}
						left={450}
					/>
				</Box>
				<Box sx={styles.rightImageBox}>
					<Image
						src="/image/banner-05_4170e1f3-29b8-4448-b234-22dd6534f586.webp"
						radius="lg"
						alt="banner-02"
						maw={590}
						sx={styles.rightImage}
					/>
					<DiscountText
						smallText="Special Offer"
						bigText="Gift Voucher"
						buttonText="Shop now"
						bottom={-1650}
						left={790}
					/>
				</Box>
			</Flex>
		</Flex>
	);
}

export default OfferComponent;
