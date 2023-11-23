import { Box, Text, Button } from '@mantine/core';
import React, { useMemo } from 'react';

interface DescriptionProps {
	mainText: string;
	smallText: string;
	buttonText: string;
}

function DescriptionComponent({
	mainText,
	smallText,
	buttonText,
}: DescriptionProps) {
	const styles = useMemo(
		() => ({
			font: {
				fontFamily: 'Josefin Sans',
				lineHeight: '50px',
			},
			buttonPink: {
				fontSize: '12px',
				width: '200px',
				backgroundColor: 'black',
				transition: 'background-color 0.3s, color 0.3s',
				'&:hover': {
					backgroundColor: 'pink',
					color: 'black',
				},
			},
			buttonWhite: {
				fontSize: '12px',
				width: '200px',
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
		<Box>
			<Box>
				<Text fz={'45px'} fw={550} sx={styles.font}>
					{mainText}
				</Text>
			</Box>
			<Box
				sx={{
					marginTop: '40px',
				}}
			>
				<Text fz={'12px'} fw={500}>
					{smallText}
				</Text>
			</Box>
			<Box
				sx={{
					marginTop: '50px',
				}}
			>
				<Button
					radius="xl"
					uppercase
					size="md"
					sx={
						buttonText === 'shop now' ? styles.buttonWhite : styles.buttonPink
					}
				>
					{buttonText}
				</Button>
			</Box>
		</Box>
	);
}

export default DescriptionComponent;
