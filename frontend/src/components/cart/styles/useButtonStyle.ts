import { useMemo } from 'react';

export const useButtonStyle = () => {
	return useMemo(
		() => ({
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
