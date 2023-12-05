import { ActionIcon, Box, Modal, Autocomplete } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';

function SearchComponent() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<Box>
			<Modal opened={opened} onClose={close} withCloseButton={false} size="lg">
				<Autocomplete
					label="Search Your Favourite Products"
					placeholder="Pick one"
					h={200}
					dropdownPosition="bottom"
					data={['Teddy', 'Rubix Cube', 'Ben 10', 'Pikachu']}
					zIndex={1}
					icon={<IconSearch />}
				/>
			</Modal>
			<ActionIcon color="dark" size="xl" variant="transparent" onClick={open}>
				<IconSearch size="1.625rem" />
			</ActionIcon>
		</Box>
	);
}

export default SearchComponent;
