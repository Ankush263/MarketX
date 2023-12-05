import { useMemo } from 'react';

export const useDescriptionComponentStyle = () => {
	return useMemo(
		() => ({
			buttonPink: {
				fontSize: '12px',
				backgroundColor: 'black',
				transition: 'background-color 0.3s, color 0.3s',
				'&:hover': {
					backgroundColor: 'pink',
					color: 'black',
				},
			},
			buttonWhite: {
				fontSize: '12px',
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
