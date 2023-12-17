import { ActionIcon, Box, Modal, Input } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';
import { search } from '../../../api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useQuery } from '@tanstack/react-query';

function SearchComponent() {
	const [opened, { open, close }] = useDisclosure(false);
	const [value, setValue] = useState('');
	const token = useSelector((state: RootState) => state.token.value);

	const fetch = async () => {
		try {
			const product = await search(token, value);
			return product.data.data.data;
		} catch (error) {
			console.log(error);
		}
	};

	const fetchSearchQuery = useQuery({
		queryKey: ['products'],
		queryFn: fetch,
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		fetchSearchQuery.refetch();
	};

	return (
		<Box>
			<Modal opened={opened} onClose={close} withCloseButton={false} size="lg">
				<Input
					placeholder="search name"
					value={value}
					onChange={(e) => handleChange(e)}
				/>
			</Modal>
			<ActionIcon color="dark" size="xl" variant="transparent" onClick={open}>
				<IconSearch size="1.625rem" />
			</ActionIcon>
		</Box>
	);
}

export default SearchComponent;
