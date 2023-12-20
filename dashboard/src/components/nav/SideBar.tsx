import { ActionIcon, Box, Divider, Flex, Text } from '@mantine/core';
import {
	IconClipboardList,
	IconBrandGoogleBigQuery,
} from '@tabler/icons-react';
import { useComponentStyle } from './styles/useComponentStyle';
import LogoutComponent from '../auth/LogoutComponent';
import UploadNavButtonComponent from '../uploadproducts/UploadNavButtonComponent';
import OverviewNavButtonComponent from '../overview/OverviewNavButtonComponent';
import MyAccountButtonComponent from '../account/MyAccountButtonComponent';
import OrderHistoryNavButton from '../orderhistory/OrderHistoryNavButton';

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
				<Text
					color="white"
					ff={'Kaushan Script'}
					mr={50}
					fz={30}
					fw={700}
					mt={10}
				>
					MarketX
				</Text>
				<Box mt={70}>
					<Divider w={280} />
				</Box>
				<Flex mt={50} mb={30} direction={'column'}>
					<OverviewNavButtonComponent />
					<UploadNavButtonComponent />
					<Flex w={250} sx={styles.hoverComponent} align={'center'}>
						<ActionIcon variant="transparent">
							<IconClipboardList color="white" size="1.2rem" />
						</ActionIcon>
						<Text fw={500} color="white" fz={15} ml={12}>
							My Products
						</Text>
					</Flex>
					<OrderHistoryNavButton />
					<Flex w={250} sx={styles.hoverComponent} align={'center'}>
						<ActionIcon variant="transparent">
							<IconBrandGoogleBigQuery color="white" size="1.2rem" />
						</ActionIcon>
						<Text fw={500} color="white" fz={15} ml={12}>
							Custom Query
						</Text>
					</Flex>
					<MyAccountButtonComponent />
				</Flex>
				<Divider my={'xl'} w={280} />
				<Box mt={80}>
					<LogoutComponent />
				</Box>
			</Flex>
		</Box>
	);
}

export default SideBar;
