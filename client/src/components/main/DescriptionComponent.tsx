import { Box, Text, Button } from '@mantine/core';
import React from 'react';
import { useDescriptionComponentStyle } from './styles/useDescriptionComponentStyle';

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
	const styles = useDescriptionComponentStyle();

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
