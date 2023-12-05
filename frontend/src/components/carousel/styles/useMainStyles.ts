import { rem } from '@mantine/core';
import { useMemo } from 'react';

export const useMainStyle = () => {
	return useMemo(
		() => ({
			carouselStyle: {
				indicator: {
					width: rem(8),
					height: rem(8),
					transition: 'width 250ms ease',
					color: 'black',
					background: 'black',
					borderRadius: '100px',

					'&[data-active]': {
						width: rem(40),
					},
				},
			},
		}),
		[]
	);
};
