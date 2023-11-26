import { Box, Button, Flex, Text } from '@mantine/core';
import React from 'react';
import { useDiscountTextStyles } from './styles/useDiscountTextStyles';

interface DiscountTextProps {
	smallText: string;
	bigText: string;
	buttonText: string;
	bottom: string | number;
	left: string | number;
}

function DiscountText({
	smallText,
	bigText,
	buttonText,
	bottom,
	left,
}: DiscountTextProps) {
	const styles = useDiscountTextStyles();

	return (
		<Flex
			sx={styles.main}
			pos={'absolute'}
			bottom={bottom}
			left={left}
			w={300}
			h={175}
			direction={'column'}
			justify={'space-between'}
			align={smallText === 'Special Offer' ? 'center' : 'start'}
		>
			<Box>
				<Text
					fz={'28px'}
					fw={500}
					color="#fff"
					lh={'50px'}
					ff={'Josefin Sans'}
					align={smallText === 'Special Offer' ? 'center' : 'start'}
				>
					{smallText}
				</Text>
				<Text fz={'45px'} fw={500} color="#fff" lh={'50px'} ff={'Josefin Sans'}>
					{bigText}
				</Text>
			</Box>
			<Button sx={styles.button} radius="xl" uppercase size="md" w={150}>
				{buttonText}
			</Button>
		</Flex>
	);
}

export default DiscountText;
