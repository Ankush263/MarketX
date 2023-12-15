import { Box, Flex, Input, Text, ScrollArea, Radio } from '@mantine/core';
import Nav from '../components/navbar/Nav';
import { useState } from 'react';
import PaymentComponent from '../components/payment/PaymentComponent';

function CheckoutPage() {
	const [value, setValue] = useState('react');
	return (
		<Box>
			<Box sx={{ borderBottom: '1px solid #f2f2f2' }}>
				<Nav />
			</Box>
			<Flex>
				<Flex justify={'end'} mr={50} w={'60%'}>
					<ScrollArea h={'100vh'} scrollHideDelay={500}>
						<Flex w={'100%'} direction={'column'}>
							<Text fz={25} fw={500}>
								Location
							</Text>
							<Input placeholder="Country/Region" />
							<Flex mt={20} justify={'space-between'}>
								<Input placeholder="City" w={'32%'} />
								<Input placeholder="State" w={'32%'} />
								<Input placeholder="Pin code" type="number" w={'32%'} />
							</Flex>
							<Input placeholder="Address" mt={20} />
							<Text fz={25} fw={500} mt={20}>
								Shipping method
							</Text>
							<Radio.Group value={value} onChange={setValue}>
								<Flex
									sx={{ border: '1px solid #fdd8d8' }}
									justify={'space-between'}
									align={'center'}
									h={70}
								>
									<Radio ml={10} value={'a'} />
									<Flex w={'93%'} justify={'space-between'} align={'center'}>
										<Flex direction={'column'} justify={'space-between'}>
											<Text fz={15}>
												USPS First Class Package International
											</Text>
											<Text fz={14} color="#787878">
												7 to 21 business days
											</Text>
										</Flex>
										<Text mr={10} fw={500} fz={15}>
											$1,233.00
										</Text>
									</Flex>
								</Flex>
								<Flex
									sx={{ border: '1px solid #fdd8d8' }}
									justify={'space-between'}
									align={'center'}
									h={70}
								>
									<Radio ml={10} value={'b'} />
									<Flex w={'93%'} justify={'space-between'} align={'center'}>
										<Flex direction={'column'} justify={'space-between'}>
											<Text fz={15}>
												USPS First Class Package International
											</Text>
											<Text fz={14} color="#787878">
												7 to 21 business days
											</Text>
										</Flex>
										<Text mr={10} fw={500} fz={15}>
											$1,233.00
										</Text>
									</Flex>
								</Flex>
								<Flex
									sx={{ border: '1px solid #fdd8d8' }}
									justify={'space-between'}
									align={'center'}
									h={70}
								>
									<Radio ml={10} value={'c'} />
									<Flex w={'93%'} justify={'space-between'} align={'center'}>
										<Flex direction={'column'} justify={'space-between'}>
											<Text fz={15}>
												USPS First Class Package International
											</Text>
											<Text fz={14} color="#787878">
												7 to 21 business days
											</Text>
										</Flex>
										<Text mr={10} fw={500} fz={15}>
											$1,233.00
										</Text>
									</Flex>
								</Flex>
								<Flex
									sx={{ border: '1px solid #fdd8d8' }}
									justify={'space-between'}
									align={'center'}
									h={70}
								>
									<Radio ml={10} value={'d'} />
									<Flex w={'93%'} justify={'space-between'} align={'center'}>
										<Flex direction={'column'} justify={'space-between'}>
											<Text fz={15}>
												USPS First Class Package International
											</Text>
											<Text fz={14} color="#787878">
												7 to 21 business days
											</Text>
										</Flex>
										<Text mr={10} fw={500} fz={15}>
											$1,233.00
										</Text>
									</Flex>
								</Flex>
							</Radio.Group>
						</Flex>
						<Text mt={10} fz={25} fw={500}>
							Payment
						</Text>
						<PaymentComponent />
					</ScrollArea>
				</Flex>
				<Flex w={'40%'} h={'100vh'} bg={'#f2f2f2'}></Flex>
			</Flex>
		</Box>
	);
}

export default CheckoutPage;
