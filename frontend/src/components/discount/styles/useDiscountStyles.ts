import { useMemo } from 'react';

export const useDiscountStyles = () => {
	return useMemo(
		() => ({
			upperLeftImageBox: {
				borderRadius: '15px',
				overflow: 'hidden',
			},
			upperLeftImage: {
				transition: 'transform 0.2s ease-in-out',
				'&:hover': {
					transform: 'scale(1.2)',
				},
			},
			upperRightImageBox: {
				borderRadius: '15px',
				overflow: 'hidden',
			},
			upperRightImage: {
				transition: 'transform 0.2s ease-in-out',
				'&:hover': {
					transform: 'scale(1.2)',
				},
			},
			lowerBox: {
				borderRadius: '15px',
				overflow: 'hidden',
			},
			lowerImageBox: {
				transition: 'transform 0.2s ease-in-out',
				'&:hover': {
					transform: 'scale(1.2)',
				},
			},
		}),
		[]
	);
};
