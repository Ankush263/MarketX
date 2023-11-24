import React, { useMemo } from 'react';

export const useNavStyles = () => {
	return useMemo(
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
};
