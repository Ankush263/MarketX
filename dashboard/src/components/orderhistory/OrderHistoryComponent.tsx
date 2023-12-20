import { Divider, Flex, Table, Text, Avatar, Badge, Box } from '@mantine/core';
import { getOrderHistory } from '../../api';
import { getToken } from '../../token';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface OrderHistoryInterface {
	id: number;
	username: string;
	email: string;
	transactionId: string;
	productName: string;
	price: number;
	quantity: number;
	paymentOption: string;
	subTotal: number;
	paid: boolean;
}

function OrderHistoryComponent() {
	const [elements, setElements] = useState<OrderHistoryInterface[]>([]);
	const token = getToken();

	const handleGetOrderHistory = async () => {
		const history = await getOrderHistory(token);
		setElements(history.data.data.history);
		return history.data.data.history;
	};

	useQuery({ queryKey: ['orders'], queryFn: handleGetOrderHistory });

	const rows = elements.map((element) => (
		<tr key={element.id}>
			<Text component="td">{element.id}</Text>
			<Text component="td">
				<Flex>
					<Avatar mr={10} color="cyan" radius="xl">
						{element.username.charAt(0)}
					</Avatar>
					<Flex direction={'column'}>
						<Text>{element.username}</Text>
						<Text>{element.email}</Text>
					</Flex>
				</Flex>
			</Text>
			<Text component="td" align="center">
				{element.productName}
			</Text>
			<Text component="td" align="center">
				$ {element.price}
			</Text>
			<Text component="td" align="center">
				{element.quantity}
			</Text>
			<Text component="td" align="center">
				{element.subTotal}
			</Text>
			<Text component="td" align="center">
				{element.paymentOption}
			</Text>
			<Box component="td">
				{element.paid ? (
					<Badge color="green" variant="filled">
						success
					</Badge>
				) : (
					<Badge color="red" variant="filled">
						failed
					</Badge>
				)}
			</Box>
		</tr>
	));

	return (
		<Flex direction={'column'} align={'center'} onClick={handleGetOrderHistory}>
			<Flex w={'100%'} justify={'start'}>
				<Text align="start" fz={30} fw={500} color="white" mt={100} ml={50}>
					Orders
				</Text>
			</Flex>
			<Divider
				mt={30}
				mb={30}
				w={'90%'}
				color="rgb(225, 225, 225, 0.4)"
				size={'xs'}
			/>
			<Flex
				w={'90%'}
				bg={'rgba(35, 48, 68)'}
				py={10}
				mb={50}
				sx={{ borderRadius: '10px' }}
			>
				<Table horizontalSpacing="xl" verticalSpacing="md">
					<thead>
						<tr>
							<th>
								<Text color="white">Id</Text>
							</th>
							<th>
								<Text color="white">User</Text>
							</th>
							<th>
								<Text color="white">Product Name</Text>
							</th>
							<th>
								<Text color="white">Price</Text>
							</th>
							<th>
								<Text color="white">Quantity</Text>
							</th>
							<th>
								<Text color="white">Sub total</Text>
							</th>
							<th>
								<Text color="white">Payment Option</Text>
							</th>
							<th>
								<Text color="white">Paid</Text>
							</th>
						</tr>
					</thead>
					<Text color="white" component="tbody">
						{rows}
					</Text>
				</Table>
			</Flex>
		</Flex>
	);
}

export default OrderHistoryComponent;
