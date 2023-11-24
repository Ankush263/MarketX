import { Box, Button, Text } from '@mantine/core';
import React, { useMemo } from 'react';

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
	const styles = useMemo(
		() => ({
			main: {
				position: 'absolute' as const,
				zIndex: 1,
				bottom: bottom,
				left: left,
				width: '300px',
				height: '175px',
				display: 'flex',
				flexDirection: 'column' as const,
				justifyContent: 'space-between' as const,
				alignItems: smallText === 'Special Offer' ? 'center' : 'start',
				transition: 'transform 0.2s ease-in-out',
				'&:hover': {
					transform: 'scale(1.1)',
				},
			},
			font: {
				fontFamily: 'Josefin Sans',
				lineHeight: '50px',
			},
			button: {
				fontSize: '12px',
				width: '150px',
				backgroundColor: 'white',
				color: 'black',
				transition: 'background-color 0.3s, color 0.3s',
				'&:hover': {
					backgroundColor: 'black',
					color: 'white',
				},
			},
		}),
		[]
	);
	return (
		<Box sx={styles.main}>
			<Box>
				<Text
					fz={'28px'}
					fw={500}
					color="#fff"
					sx={styles.font}
					align={smallText === 'Special Offer' ? 'center' : 'start'}
				>
					{smallText}
				</Text>
				<Text fz={'45px'} fw={500} color="#fff" sx={styles.font}>
					{bigText}
				</Text>
			</Box>
			<Button sx={styles.button} radius="xl" uppercase size="md">
				{buttonText}
			</Button>
		</Box>
	);
}

export default DiscountText;
