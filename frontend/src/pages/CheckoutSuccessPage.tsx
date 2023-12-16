import { Button, Card, Flex, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';

interface ParamsInterface {
	sessionId: string;
}

function CheckoutSuccessPage() {
	const params: ParamsInterface = useParams();

	const handleClick = () => {
		console.log(params.sessionId);
		window.location.replace('/');
	};
	return (
		<Flex justify={'center'} align={'center'} h={'100vh'}>
			<Card shadow="sm" padding="xl" radius="md" withBorder w={300} h={330}>
				<Card.Section>
					<Text fz={70}>💳🛒🫂</Text>
				</Card.Section>
				<Text fw={600}>
					Thank you{' '}
					<Text span c="blue" inherit>
						rahulbk123@gmail.com
					</Text>{' '}
					for shopping with us
				</Text>
				<Card.Section>
					<Text fz={70}>🥳🎊🪅</Text>
				</Card.Section>
				<Flex justify={'center'}>
					<Button onClick={handleClick}>Go To Home</Button>
				</Flex>
			</Card>
		</Flex>
	);
}

export default CheckoutSuccessPage;
