import {
	Card,
	Flex,
	Text,
	Image,
	ActionIcon,
	TextInput,
	Button,
	Tooltip,
} from '@mantine/core';
import TotalProductCard from '../../stats/TotalProductCard';
import TotalRevenewCard from '../../stats/TotalRevenewCard';
import TotalOrderNumberCard from '../../stats/TotalOrderNumberCard';
import { IconEdit, IconRefresh } from '@tabler/icons-react';
import { useState } from 'react';
import { getMe, updateMe } from '../../api';
import { getToken } from '../../token';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import '../../styles/style.css';
import { callSuccessNotification } from '../../notification';

function MyAccountComponent() {
	const [edit, setEdit] = useState<boolean>(false);
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const token = getToken();
	const queryClient = useQueryClient();

	const fetchMyDetails = async () => {
		const me = await getMe(token);
		return me.data.data.doc;
	};

	const query = useQuery({ queryKey: ['me'], queryFn: fetchMyDetails });

	const handleEdit = async () => {
		const name = username === '' ? query.data.username : username;
		const mail = email === '' ? query.data.email : email;
		const me = await updateMe(token, { username: name, email: mail });
		return me;
	};

	const editMutation = useMutation({
		mutationFn: handleEdit,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['me'] });
			setEdit(false);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const handleRefresh = () => {
		queryClient.refetchQueries({ queryKey: ['products'] });
		queryClient.refetchQueries({ queryKey: ['total_order'] });
		queryClient.refetchQueries({ queryKey: ['total_revenew'] });
		setIsRefreshing(true);
		setTimeout(() => {
			callSuccessNotification('Successfully update all the details');
			setIsRefreshing(false);
		}, 2000);
	};

	return (
		<Flex>
			<Tooltip
				label="Click refresh to update the user details"
				color="gray"
				position="bottom-start"
				withArrow
			>
				<Button
					leftIcon={
						<IconRefresh
							size="1.2rem"
							className={isRefreshing ? 'rotate-icon' : ''}
						/>
					}
					variant="outline"
					pos={'absolute'}
					onClick={handleRefresh}
					ml={100}
					mt={50}
				>
					Refresh
				</Button>
			</Tooltip>
			<Flex mt={120} ml={200} direction={'column'}>
				<Text fz={35} color="white" fw={500} onClick={fetchMyDetails}>
					Account
				</Text>

				<Flex>
					<Card bg={'rgba(225, 225, 225, 0.04)'} mt={20} radius={'lg'}>
						<Flex w={200}>
							<Image src={'/images/person-standing.png'} />
							<Tooltip
								label="Update your details"
								color="gray"
								position="top-start"
								pos={'fixed'}
								withArrow
							>
								<ActionIcon
									pos={'absolute'}
									onClick={() => setEdit((prev) => !prev)}
								>
									<IconEdit size={'1.3rem'} />
								</ActionIcon>
							</Tooltip>
						</Flex>
						{edit ? (
							<Flex direction={'column'}>
								<Text color="white">Edit Name:</Text>
								<TextInput
									mb={10}
									placeholder={`${
										query.isLoading ? 'Loading...' : query.data.username
									}`}
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</Flex>
						) : (
							<Text fz={25} color="white" fw={400} align="center">
								{query.isLoading ? 'Loading...' : query.data.username}
							</Text>
						)}

						{edit ? (
							<Flex direction={'column'}>
								<Text color="white">Edit Email:</Text>
								<TextInput
									mb={10}
									placeholder={`${
										query.isLoading ? 'Loading...' : query.data.email
									}`}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Flex>
						) : (
							<Text
								fz={15}
								color="rgba(225, 225, 225, 0.4)"
								fw={400}
								align="center"
							>
								{query.isLoading ? 'Loading...' : query.data.email}
							</Text>
						)}
						{edit && (
							<Flex justify={'center'}>
								<Button color="green" onClick={() => editMutation.mutate()}>
									Create
								</Button>
							</Flex>
						)}
					</Card>
					<Flex direction={'column'} align={'center'} ml={100} mt={20}>
						<Flex>
							<Flex mr={20} mb={20}>
								<TotalProductCard w={300} h={150} iconSize={50} fz={40} />
							</Flex>
							<TotalRevenewCard w={300} h={150} iconSize={50} fz={40} />
						</Flex>
						<TotalOrderNumberCard w={300} h={150} iconSize={50} fz={40} />
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default MyAccountComponent;
