import { ActionIcon, Box, Divider, Flex, Text } from '@mantine/core';
import {
	IconChartBar,
	IconCloudUpload,
	IconClipboardList,
	IconHistory,
	IconBrandGoogleBigQuery,
	IconUser,
	IconLogout,
} from '@tabler/icons-react';
import { useComponentStyle } from './styles/useComponentStyle';

function SideBar() {
	const styles = useComponentStyle();

	return (
		<Box>
			<Flex
				h={'100vh'}
				w={280}
				bg={'rgb(35, 48, 68)'}
				direction={'column'}
				align={'center'}
			>
				<Text color="white" ff={'Kaushan Script'} mr={50} fz={30} fw={700}>
					MarketX
				</Text>
				<Divider my={'xl'} w={280} />
				<Flex mt={50} mb={50} direction={'column'}>
					<Flex w={250} sx={styles.hoverComponent} align={'center'}>
						<ActionIcon variant="transparent">
							<IconChartBar color="white" size="1.2rem" />
						</ActionIcon>
						<Text fw={500} color="white" fz={15} ml={12}>
							Overview
						</Text>
					</Flex>
					<Flex w={250} sx={styles.hoverComponent} align={'center'}>
						<ActionIcon variant="transparent">
							<IconCloudUpload color="white" size="1.2rem" />
						</ActionIcon>
						<Text fw={500} color="white" fz={15} ml={12}>
							Upload Product
						</Text>
					</Flex>
					<Flex w={250} sx={styles.hoverComponent} align={'center'}>
						<ActionIcon variant="transparent">
							<IconClipboardList color="white" size="1.2rem" />
						</ActionIcon>
						<Text fw={500} color="white" fz={15} ml={12}>
							My Products
						</Text>
					</Flex>
					<Flex w={250} sx={styles.hoverComponent} align={'center'}>
						<ActionIcon variant="transparent">
							<IconHistory color="white" size="1.2rem" />
						</ActionIcon>
						<Text fw={500} color="white" fz={15} ml={12}>
							Order History
						</Text>
					</Flex>
					<Flex w={250} sx={styles.hoverComponent} align={'center'}>
						<ActionIcon variant="transparent">
							<IconBrandGoogleBigQuery color="white" size="1.2rem" />
						</ActionIcon>
						<Text fw={500} color="white" fz={15} ml={12}>
							Custom Query
						</Text>
					</Flex>
					<Flex w={250} sx={styles.hoverComponent} align={'center'}>
						<ActionIcon variant="transparent">
							<IconUser color="white" size="1.2rem" />
						</ActionIcon>
						<Text fw={500} color="white" fz={15} ml={12}>
							My Account
						</Text>
					</Flex>
				</Flex>
				<Divider my={'xl'} w={280} />
				<Box mt={80}>
					<Flex w={250} sx={styles.hoverComponent} align={'center'}>
						<ActionIcon variant="transparent">
							<IconLogout color="white" size="1.2rem" />
						</ActionIcon>
						<Text fw={500} color="white" fz={15} ml={12}>
							Logout
						</Text>
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
}

export default SideBar;
