import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { useMainStyle } from './styles/useMainStyles';
import { BackgroundImage, Box } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import DescriptionComponent from './DescriptionComponent';

function CarouselComponent() {
	const styles = useMainStyle();
	const autoplay = useRef(Autoplay({ delay: 5000 }));
	return (
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
					h={'100%'}
				>
					<Box
						sx={{ zIndex: 1 }}
						w={340}
						pos={'absolute'}
						bottom={0}
						left={0}
						mb={200}
						ml={150}
					>
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
					<Box
						sx={{ zIndex: 1 }}
						w={340}
						pos={'absolute'}
						bottom={0}
						left={0}
						mb={550}
						ml={350}
					>
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
					<Box
						sx={{ zIndex: 1 }}
						w={340}
						pos={'absolute'}
						bottom={0}
						left={0}
						mb={200}
						ml={150}
					>
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
	);
}

export default CarouselComponent;
