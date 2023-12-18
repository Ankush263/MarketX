import { Flex } from '@mantine/core';
import SideBar from '../nav/SideBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import UploadProductComponent from '../uploadproducts/UploadProductComponent';
import OverviewComponent from '../overview/OverviewComponent';

function MainComponent() {
	const uploadProducts = useSelector(
		(state: RootState) => state.component.uploadProducts
	);
	const overview = useSelector((state: RootState) => state.component.overview);
	return (
		<Flex bg={'rgb(27, 38, 53)'}>
			<SideBar />
			{uploadProducts && <UploadProductComponent />}
			{overview && <OverviewComponent />}
		</Flex>
	);
}

export default MainComponent;
