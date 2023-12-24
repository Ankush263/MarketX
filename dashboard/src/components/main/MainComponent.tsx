import { Flex, ScrollArea } from '@mantine/core';
import SideBar from '../nav/SideBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import UploadProductComponent from '../uploadproducts/UploadProductComponent';
import OverviewComponent from '../overview/OverviewComponent';
import MyAccountComponent from '../account/MyAccountComponent';
import OrderHistoryComponent from '../orderhistory/OrderHistoryComponent';
import MyProdcutsComponent from '../myproducts/MyProdcutsComponent';

function MainComponent() {
	const uploadProducts = useSelector(
		(state: RootState) => state.component.uploadProducts
	);
	const overview = useSelector((state: RootState) => state.component.overview);
	const myAccount = useSelector(
		(state: RootState) => state.component.myAccount
	);
	const orderhistory = useSelector(
		(state: RootState) => state.component.orderHistory
	);
	const myproducts = useSelector(
		(state: RootState) => state.component.myProduct
	);

	return (
		<Flex bg={'rgb(27, 38, 53)'}>
			<SideBar />
			<ScrollArea h={'100vh'} w={'100%'}>
				{uploadProducts && <UploadProductComponent />}
				{overview && <OverviewComponent />}
				{myAccount && <MyAccountComponent />}
				{orderhistory && <OrderHistoryComponent />}
				{myproducts && <MyProdcutsComponent />}
			</ScrollArea>
		</Flex>
	);
}

export default MainComponent;
