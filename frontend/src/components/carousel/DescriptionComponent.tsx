import { Box, Text, Button } from '@mantine/core';
import { useDescriptionComponentStyle } from './styles/useDescriptionComponentStyle';
import { useHistory } from 'react-router-dom';

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
	const history = useHistory();

	return (
		<Box>
			<Box>
				<Text fz={'45px'} fw={550} lh={'50px'} ff={'Josefin Sans'}>
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
					onClick={() => history.push('/products')}
					// component={'a'}
					// href={'/product/ProductPage'}
					w={200}
				>
					{buttonText}
				</Button>
			</Box>
		</Box>
	);
}

export default DescriptionComponent;
