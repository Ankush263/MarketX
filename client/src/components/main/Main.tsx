import { Box, rem } from '@mantine/core';
import React, { useRef, useMemo } from 'react';
import { BackgroundImage } from '@mantine/core';
import Nav from '../navbar/Nav';
import { Carousel } from '@mantine/carousel';
import DescriptionComponent from './DescriptionComponent';
import Autoplay from 'embla-carousel-autoplay';

function Main() {
	const autoplay = useRef(Autoplay({ delay: 5000 }));
	const styles = useMemo(
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

	return (
		<Box>
			<Box sx={styles.main}>
				<Nav />
			</Box>
			<Carousel
				withIndicators
				height={'100vh'}
				loop
				plugins={[autoplay.current]}
				onMouseEnter={autoplay.current.stop}
				onMouseLeave={autoplay.current.reset}
				styles={styles.carouselStyle}
			>
				<Carousel.Slide>
					<BackgroundImage
						src="/image/slide-01_6e24db38-2fdd-4804-9fb5-633e6e66b86f.webp"
						radius="sm"
						sx={{
							height: '100%',
						}}
					>
						<Box sx={styles.descriptionBox}>
							<DescriptionComponent
								mainText={'Fun Place for your Child'}
								smallText={`Nothing better than a beautiful toy as a gift for a child. 
									It is not just an toy, but it is more valuable for a child`}
								buttonText={'start trial store'}
							/>
						</Box>
					</BackgroundImage>
				</Carousel.Slide>
				<Carousel.Slide>
					<Carousel.Slide>
						<video
							src="/image/66b35329d3d44c03b430c186f7951a91.HD-1080p-2.5Mbps-14212227.mp4"
							autoPlay
							muted
							loop
						/>
						<Box sx={styles.videoDescriptionBox}>
							<DescriptionComponent
								mainText={'Toys: Sparks of Creativity'}
								smallText={`Nothing better than a beautiful toy as a gift for a child. 
									It is not just an toy, but it is more valuable for a child`}
								buttonText={'start trial store'}
							/>
						</Box>
					</Carousel.Slide>
				</Carousel.Slide>
				<Carousel.Slide>
					<BackgroundImage
						src="/image/slide-02_d4d8330a-0943-4558-80ba-00186010a06a.webp"
						radius="sm"
						sx={{
							height: '100%',
						}}
					>
						<Box sx={styles.descriptionBox}>
							<DescriptionComponent
								mainText={'Delivering Smile with Toys'}
								smallText={`Nothing better than a beautiful toy as a gift for a child. 
								It is not just an toy, but it is more valuable for a child`}
								buttonText={'shop now'}
							/>
						</Box>
					</BackgroundImage>
				</Carousel.Slide>
			</Carousel>
		</Box>
	);
}

export default Main;
