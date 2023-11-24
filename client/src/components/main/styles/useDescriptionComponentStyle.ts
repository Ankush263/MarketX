import React, { useMemo } from 'react';

export const useDescriptionComponentStyle = () => {
	return useMemo(
		() => ({
			font: {
				fontFamily: 'Josefin Sans',
				lineHeight: '50px',
			},
			buttonPink: {
				fontSize: '12px',
				width: '200px',
				backgroundColor: 'black',
				transition: 'background-color 0.3s, color 0.3s',
				'&:hover': {
					backgroundColor: 'pink',
					color: 'black',
				},
			},
			buttonWhite: {
				fontSize: '12px',
				width: '200px',
				backgroundColor: 'white',
				color: 'black',
				transition: 'background-color 0.3s, color 0.3s',
				'&:hover': {
					backgroundColor: 'black',
					color: 'white',
				},
			},
		}),
		[]
	);
};
