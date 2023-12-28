import { Box, Divider, Flex, Text } from '@mantine/core';
import LogoutComponent from '../auth/LogoutComponent';
import UploadNavButtonComponent from '../uploadproducts/UploadNavButtonComponent';
import OverviewNavButtonComponent from '../overview/OverviewNavButtonComponent';
import MyAccountButtonComponent from '../account/MyAccountButtonComponent';
import OrderHistoryNavButton from '../orderhistory/OrderHistoryNavButton';
import MyProductsButtonComponent from '../myproducts/MyProductsButtonComponent';
import CustomQueryButtonComponent from '../customquery/CustomQueryButtonComponent';

function SideBar() {
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
					<MyProductsButtonComponent />
					<OrderHistoryNavButton />
					<CustomQueryButtonComponent />
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
