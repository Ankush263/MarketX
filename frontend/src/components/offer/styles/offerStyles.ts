import { useMemo } from 'react';

export const useOfferStyles = () => {
	return useMemo(
		() => ({
			leftImageBox: {
				borderRadius: '15px',
				overflow: 'hidden',
			},
			leftImage: {
				transition: 'transform 0.2s ease-in-out',
				'&:hover': {
					transform: 'scale(1.1)',
				},
			},
			rightImageBox: {
				borderRadius: '15px',
				overflow: 'hidden',
			},
			rightImage: {
				transition: 'transform 0.2s ease-in-out',
				borderRadius: '8px',
				'&:hover': {
					transform: 'scale(1.2)',
				},
			},
		}),
		[]
	);
};
