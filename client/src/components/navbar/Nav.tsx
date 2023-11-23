import { Box, Text, ActionIcon } from '@mantine/core';
import {
	IconUser,
	IconSearch,
	IconShoppingCartPlus,
	IconSettings2,
} from '@tabler/icons-react';
import React, { useMemo } from 'react';

function Nav() {
	const styles = useMemo(
		() => ({
			main: {
				display: 'flex',
				justifyContent: 'center',
			},
			nav: {
				width: '65%',
				height: '80px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			},
			bigTextStyle: {
				marginRight: '50px',
				fontFamily: 'Kaushan Script',
				fontSize: '30px',
				fontWeight: 700,
			},
			leftNav: {
				width: '25%',
				height: '100%',
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
			},
			rightNav: {
				width: '30%',
				height: '100%',
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
			},
		}),
		[]
	);
	return (
		<Box sx={styles.main}>
			<Box sx={styles.nav}>
				<Text sx={styles.bigTextStyle}>MarketX</Text>
				<Box sx={styles.leftNav}>
					<Text fz="lg" fw={500} component="a" href="#">
						Home
					</Text>
					<Text fz="lg" fw={500} component="a" href="#">
						Products
					</Text>
				</Box>

				<Box sx={styles.rightNav}>
					<ActionIcon color="dark" size="xl" variant="transparent">
						<IconUser size="1.625rem" />
					</ActionIcon>
					<ActionIcon color="dark" size="xl" variant="transparent">
						<IconSearch size="1.625rem" />
					</ActionIcon>
					<ActionIcon color="dark" size="xl" variant="transparent">
						<IconShoppingCartPlus size="1.625rem" />
					</ActionIcon>
					<ActionIcon color="dark" size="xl" variant="transparent">
						<IconSettings2 size="1.625rem" />
					</ActionIcon>
				</Box>
			</Box>
		</Box>
	);
}

export default Nav;
