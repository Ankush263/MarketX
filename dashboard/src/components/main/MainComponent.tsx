import { Flex, ScrollArea } from '@mantine/core';
import SideBar from '../nav/SideBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import UploadProductComponent from '../uploadproducts/UploadProductComponent';
import OverviewComponent from '../overview/OverviewComponent';
import MyAccountComponent from '../account/MyAccountComponent';

function MainComponent() {
	const uploadProducts = useSelector(
		(state: RootState) => state.component.uploadProducts
	);
	const overview = useSelector((state: RootState) => state.component.overview);
	const myAccount = useSelector(
		(state: RootState) => state.component.myAccount
	);
	return (
		<Flex bg={'rgb(27, 38, 53)'}>
			<SideBar />
			<ScrollArea h={'100vh'} w={'100%'}>
				{uploadProducts && <UploadProductComponent />}
				{overview && <OverviewComponent />}
				{myAccount && <MyAccountComponent />}
			</ScrollArea>
		</Flex>
	);
}

export default MainComponent;
