import { Box, Button, Flex, Image, Text } from '@mantine/core';
import React from 'react';

function QualityComponent() {
	return (
		<Box sx={{ minHeight: '100vh', overflow: 'hidden' }}>
			<Image src="/image/bg-toys.webp" alt="background" />
			<Flex
				direction={'column'}
				justify={'center'}
				align={'center'}
				w={'600px'}
				bottom={-2250}
				left={450}
				pos={'absolute'}
			>
				<Text fw={'bold'} fz={'25px'} ff={'Josefin Sans'}>
					Our Quality Control
				</Text>
				<Text align="center" fz={'md'} ff={'Josefin Sans'} mt={35} fw={500}>
					Every component of our toys is checked to ensure that it complies with
					all safety rules. Design review, material quality, final product
					testing, hardness testing, chemical, fire resistance testing, and
					usage testing are all part of our testing methods. All testing are
					performed with the primary purpose of providing a high-quality product
					to your children.
				</Text>
				<Text align="center" ff={'Josefin Sans'} mt={25} fw={500}>
					Toys are the basis of child development. Without the interest of the
					baby, even the coolest and most expensive toy will not fulfill its
					task.
				</Text>
				<Button color="dark" uppercase radius="xl" fz={12} w={150} mt={40}>
					read more
				</Button>
			</Flex>
		</Box>
	);
}

export default QualityComponent;
