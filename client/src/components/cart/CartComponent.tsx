import {
	ActionIcon,
	Box,
	Drawer,
	Flex,
	Text,
	ScrollArea,
	Button,
	Checkbox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
	IconShoppingCartPlus,
	IconShoppingBag,
	IconTrash,
} from '@tabler/icons-react';
import React from 'react';
import CartItemCard from './CartItemCard';

function CartComponent() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<Box>
			<Box>
				<ActionIcon color="dark" size="xl" variant="transparent" onClick={open}>
					<IconShoppingCartPlus size="1.625rem" />
				</ActionIcon>
			</Box>
			<Drawer
				opened={opened}
				onClose={close}
				overlayProps={{ opacity: 0.5, blur: 4 }}
				position="right"
				size={'lg'}
			>
				{/* {<Flex
					justify={'center'}
					align={'center'}
					h={'400px'}
					direction={'column'}
				>
					<IconShoppingBag size={'150px'} color="#d4d7d9" />
					<Text fw={700} fz={19}>
						Your cart is empty
					</Text>
					<Text fz={12}>You have not added any products yet.</Text>
				</Flex>} */}
				<Flex direction={'column'} justify={'center'} align={'center'}>
					<Box w={'85%'}>
						<Text fz={25} fw={700}>
							Shopping Cart
						</Text>
					</Box>
					<Box>
						<ScrollArea
							h={400}
							scrollHideDelay={500}
							w={500}
							mt={20}
							sx={{ border: '1px solid red' }}
						>
							<Text fz={25} fw={700} mt={10}>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
								hic officia velit voluptatem pariatur, excepturi quasi. Tempora
								soluta molestias fugit eius corporis? Dolorem sint modi illum
								iste dolor ut natus commodi? Eius dolore quae molestias
								aspernatur, recusandae reprehenderit ratione praesentium
								accusantium inventore dolorum? Quas voluptates reiciendis alias
								sapiente tempora eligendi, sunt minima earum, porro commodi
								illum, odio vitae sed mollitia. Eius quas exercitationem placeat
								totam. Cum odit quaerat exercitationem ex consequatur odio
								officia quia aperiam cupiditate temporibus? Consequatur dolorum
								ad assumenda, molestiae fuga iure accusantium placeat quam ipsum
								iste laborum expedita quis repellat provident dicta? Ratione
								laudantium beatae eligendi illo!
							</Text>
						</ScrollArea>
					</Box>
					<Flex w={'85%'} justify={'end'} mt={10}>
						<Text fz={20} fw={700}>
							SUBTOTAL $40.60 USD
						</Text>
					</Flex>
					<Flex mt={40} w={'75%'} justify={'space-between'} align={'center'}>
						<Button
							uppercase
							radius={'xl'}
							w={'45%'}
							h={40}
							color="gray"
							fz={12}
						>
							add more products
						</Button>
						<Button
							uppercase
							radius={'xl'}
							w={'45%'}
							h={40}
							color="dark"
							fz={12}
						>
							check out
						</Button>
					</Flex>
					<Flex mt={30} w={'85%'} justify={'space-between'} align={'center'}>
						<Flex>
							<ActionIcon size={'sm'}>
								<IconTrash />
							</ActionIcon>
							<Text fz={15}>Clear cart</Text>
						</Flex>
						<Checkbox label="I agree to the store policy" size={'xs'} />
					</Flex>
				</Flex>
			</Drawer>
		</Box>
	);
}

export default CartComponent;
