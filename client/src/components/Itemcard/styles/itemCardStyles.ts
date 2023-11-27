import React, { useMemo } from 'react';

export const itemCardStyles = () => {
	return useMemo(
		() => ({
			card: {
				display: 'flex',
				flexDirection: 'column' as const,
				justifyContent: 'center',
				alignItems: 'center',
				cursor: 'pointer',
				boxShadow: '5px 3px 3px rgba(237, 231, 225, .6)',
				'&:hover': {
					boxShadow: '5px 5px 12px 10px rgba(237, 231, 225, .8)',
					transition: 'all .35s',
				},
				transition: 'all .35s',
			},
			fImage: {
				transform: 'translateY(-10%)',
				transition: 'all .35s',
			},
			sImage: {
				transition: 'all .35s',
			},
			button: {
				fontSize: '12px',
				'&:hover': {
					backgroundColor: 'pink',
				},
			},
		}),
		[]
	);
};
