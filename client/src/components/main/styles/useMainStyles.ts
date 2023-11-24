import { rem } from '@mantine/core';
import React, { useMemo } from 'react';

export const useMainStyle = () => {
	return useMemo(
		() => ({
			descriptionBox: {
				width: '340px',
				position: 'absolute' as const,
				bottom: 0,
				left: 0,
				marginBottom: '200px',
				marginLeft: '150px',
				zIndex: 1,
			},
			videoDescriptionBox: {
				width: '340px',
				position: 'absolute' as const,
				bottom: 0,
				left: 0,
				marginBottom: '550px',
				marginLeft: '350px',
				zIndex: 1,
			},
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
			main: {
				position: 'absolute' as const,
				top: 0,
				left: 0,
				zIndex: 1,
				width: '100%',
			},
		}),
		[]
	);
};
