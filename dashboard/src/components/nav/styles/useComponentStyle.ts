import { useMemo } from 'react';

export const useComponentStyle = () => {
	return useMemo(
		() => ({
			hoverComponent: {
				borderRadius: '10px',
				padding: '5px',
				marginTop: '10px',
				paddingLeft: '10px',
				'&:hover': {
					cursor: 'pointer',
					backgroundColor: 'rgb(27, 38, 53)',
				},
				'&:active': {
					backgroundColor: 'rgba(255, 255, 255, 0.04)',
				},
			},
		}),
		[]
	);
};
