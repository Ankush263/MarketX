import { useMemo } from 'react';

export const useDiscountTextStyles = () => {
	return useMemo(
		() => ({
			main: {
				zIndex: 1,
				transition: 'transform 0.2s ease-in-out',
				'&:hover': {
					transform: 'scale(1.1)',
				},
			},
			button: {
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
