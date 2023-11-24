import { Box, Image } from '@mantine/core';
import React from 'react';
import DiscountText from './DiscountText';
import { useDiscountStyles } from './styles/useDiscountStyles';

function DiscountComponent() {
	const styles = useDiscountStyles();

	return (
		<Box sx={styles.main}>
			<Box sx={styles.upperBox}>
				<Box sx={styles.upperLeftImageBox}>
					<Image
						src="/image/banner-01_de317ca7-3140-4d6d-9a88-5465fad30db5.webp"
						radius="lg"
						alt="banner-01"
						maw={590}
						sx={styles.upperLeftImage}
					/>
					<DiscountText
						smallText="Play Like"
						bigText="Baby Toy"
						buttonText="Shop now"
						bottom={-280}
						left={200}
					/>
				</Box>
				<Box sx={styles.upperRightImageBox}>
					<Image
						src="/image/banner-02_d2ca3eec-8fc2-40d8-bbc6-03d12bf76946.webp"
						radius="lg"
						alt="banner-02"
						maw={590}
						sx={styles.upperRightImage}
					/>
					<DiscountText
						smallText="Big Discount"
						bigText="50% OFF"
						buttonText="Shop now"
						bottom={-280}
						left={830}
					/>
				</Box>
			</Box>
			<Box sx={styles.lowerBox}>
				<Image
					src="/image/banner-03_e47cc8df-8a25-4abe-84fd-19709a236a4b.webp"
					radius="lg"
					alt="banner-03"
					sx={styles.lowerImageBox}
				/>
				<DiscountText
					smallText="Special Offer"
					bigText="Gift Voucher"
					buttonText="Shop now"
					bottom={-650}
					left={620}
				/>
			</Box>
		</Box>
	);
}

export default DiscountComponent;
