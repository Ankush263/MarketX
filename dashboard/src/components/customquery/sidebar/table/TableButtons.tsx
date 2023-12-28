import { Flex, Tooltip, Text } from '@mantine/core';
import { IconInfoCircle, IconTable } from '@tabler/icons-react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function TableButtons() {
	const [userHover, setUserHover] = useState<boolean>();
	const [productsHover, setProductsHover] = useState<boolean>();
	const [buyHover, setBuyHover] = useState<boolean>();
	const history = useHistory();

	return (
		<Flex w={'100%'} direction={'column'} align={'center'}>
			<Flex
				w={'85%'}
				mt={20}
				p={6}
				sx={{
					':hover': {
						backgroundColor: 'rgb(27, 38, 53)',
						cursor: 'pointer',
					},
				}}
				align={'center'}
				onMouseEnter={() => setUserHover(true)}
				onMouseLeave={() => setUserHover(false)}
				onClick={() => history.push('/custom_query/users')}
			>
				<IconTable color="white" />
				<Text c={'white'} fz={15} ml={10}>
					Users
				</Text>
				<Flex ml={'auto'}>
					{userHover && (
						<Tooltip
							label="Users Table"
							position="right"
							pos={'fixed'}
							withArrow
							c={'black'}
							color="gray"
						>
							<IconInfoCircle color="white" size={'1.3rem'} />
						</Tooltip>
					)}
				</Flex>
			</Flex>
			<Flex
				w={'85%'}
				mt={10}
				p={6}
				sx={{
					':hover': {
						backgroundColor: 'rgb(27, 38, 53)',
						cursor: 'pointer',
					},
				}}
				align={'center'}
				onMouseEnter={() => setProductsHover(true)}
				onMouseLeave={() => setProductsHover(false)}
				onClick={() => history.push('/custom_query/products')}
			>
				<IconTable color="white" />
				<Text c={'white'} fz={15} ml={10}>
					Products
				</Text>
				<Flex ml={'auto'}>
					{productsHover && (
						<Tooltip
							label="This table has a besic information about products, as well as some derived fact about users based on products"
							position="right"
							pos={'fixed'}
							withArrow
							c={'black'}
							color="gray"
						>
							<IconInfoCircle color="white" size={'1.3rem'} />
						</Tooltip>
					)}
				</Flex>
			</Flex>
			<Flex
				w={'85%'}
				mt={10}
				p={6}
				sx={{
					':hover': {
						backgroundColor: 'rgb(27, 38, 53)',
						cursor: 'pointer',
					},
				}}
				align={'center'}
				onMouseEnter={() => setBuyHover(true)}
				onMouseLeave={() => setBuyHover(false)}
				onClick={() => history.push('/custom_query/buy')}
			>
				<IconTable color="white" />
				<Text c={'white'} fz={15} ml={10}>
					Buy
				</Text>
				<Flex ml={'auto'}>
					{buyHover && (
						<Tooltip
							label="This table has a besic information about buy, as well as some derived facts about products & users based on buy."
							position="right"
							pos={'fixed'}
							withArrow
							c={'black'}
							color="gray"
						>
							<IconInfoCircle color="white" size={'1.3rem'} />
						</Tooltip>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
}

export default TableButtons;
