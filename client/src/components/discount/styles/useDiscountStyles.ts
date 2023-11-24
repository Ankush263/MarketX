import React, { useMemo } from 'react';

export const useDiscountStyles = () => {
	return useMemo(
		() => ({
			main: {
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column' as const,
				justifyContent: 'center',
				alignItems: 'center',
			},
			upperBox: {
				height: '50vh',
				width: '80%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginTop: '20px',
			},
			upperLeftImageBox: {
				borderRadius: '15px',
				width: '590px',
				overflow: 'hidden',
			},
			upperLeftImage: {
				transition: 'transform 0.2s ease-in-out',
				borderRadius: '8px',
				maxWidth: '500px',
				'&:hover': {
					transform: 'scale(1.2)',
				},
			},
			upperRightImageBox: {
				borderRadius: '15px',
				width: '590px',
				overflow: 'hidden',
			},
			upperRightImage: {
				transition: 'transform 0.2s ease-in-out',
				borderRadius: '8px',
				maxWidth: '500px',
				'&:hover': {
					transform: 'scale(1.2)',
				},
			},
			lowerBox: {
				height: '50vh',
				width: '80%',
				marginTop: '20px',
				marginBottom: '20px',
				borderRadius: '15px',
				overflow: 'hidden',
			},
			lowerImageBox: {
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
