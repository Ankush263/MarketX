import {
	Accordion,
	Box,
	Flex,
	Text,
	Image,
	Divider,
	TextInput,
	Button,
	Textarea,
	MultiSelect,
	NumberInput,
	Tooltip,
} from '@mantine/core';
import { Product } from '../MyProdcutsComponent';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getToken } from '../../../token';
import { updateProducts } from '../../../api';

interface ProductDetailsInterface {
	name: string;
	company: string;
	description: string;
	weight: string;
	type: string;
}

interface UpdatedProduct {
	name: string;
	description: string;
	price: number;
	weight: string;
	company: string;
	tags: string[];
	type: string;
}

function ProductComponent({
	id,
	image,
	name,
	description,
	price,
	weight,
	company,
	tags,
	type,
}: Product) {
	const [productDetails, setProductDetails] = useState<ProductDetailsInterface>(
		{
			name: '',
			company: '',
			description: '',
			weight: '',
			type: '',
		}
	);
	const [productPrice, setProductPrice] = useState<number | ''>(0);
	const [productTags, setProductTags] = useState<string[]>([]);
	const token = getToken();
	const queryClient = useQueryClient();

	const data = [
		{ value: 'sale', label: 'Sale' },
		{ value: 'toys', label: 'Toys' },
		{ value: 'new', label: 'New' },
		{ value: 'exclusive', label: 'Exclusive' },
	];

	const handleUpdate = async () => {
		const parsedPrice: number =
			typeof productPrice === 'string'
				? parseFloat(productPrice)
				: productPrice;

		const details: UpdatedProduct = {
			name: productDetails.name === '' ? name : productDetails.name,
			company: productDetails.company === '' ? company : productDetails.company,
			description:
				productDetails.description === ''
					? description
					: productDetails.description,
			weight: productDetails.weight === '' ? weight : productDetails.weight,
			type: productDetails.type === '' ? type : productDetails.type,
			price: parsedPrice === 0 ? price : parsedPrice,
			tags: productTags.length === 0 ? tags : productTags,
		};
		await updateProducts(token, id, details);
	};

	const editMutation = useMutation({
		mutationFn: handleUpdate,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
			queryClient.invalidateQueries({ queryKey: ['stats_on_tags'] });
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const handleCancel = () => {
		setProductDetails({
			name: '',
			company: '',
			description: '',
			weight: '',
			type: '',
		});
		setProductPrice(0);
		setProductTags([]);
	};

	return (
		<Accordion
			chevronPosition="left"
			styles={{
				chevron: {
					color: 'white',
					marginLeft: '10px',
				},
			}}
			transitionDuration={500}
			className="products-hover"
		>
			<Accordion.Item value="customization" className="products-hover-none">
				<Accordion.Control p={0}>
					<Flex justify={'center'} align={'center'} w={'100%'}>
						<Flex justify={'space-around'} align={'center'} w={'95%'}>
							<Flex>
								<Box w={80} h={80} p={0}>
									<Image src={image} w={80} height={80} radius={10} />
								</Box>
								<Flex direction={'column'} justify={'center'} ml={10}>
									<Text color="white" fw={500} fz={15}>
										{name}
									</Text>
									<Text color="rgb(225, 225, 225, 0.9)" fz={11}>
										{type}
									</Text>
								</Flex>
							</Flex>
							<Text c={'rgb(225, 225, 225, 0.9)'}>$ {price}</Text>
							<Text c={'rgb(225, 225, 225, 0.9)'}>{weight}</Text>
							<Text c={'rgb(225, 225, 225, 0.9)'}>
								{tags ? tags.join(', ') : 'No tags'}
							</Text>
							<Text c={'rgb(225, 225, 225, 0.9)'}>{company}</Text>
						</Flex>
					</Flex>
				</Accordion.Control>
				<Accordion.Panel className="products-hover-panel">
					<Text fw={500} fz={26} c={'white'}>
						Update details
					</Text>
					<Divider mt={20} mb={30} w={'100%'} />
					<Flex direction={'column'}>
						<Flex justify={'space-between'}>
							<TextInput
								placeholder={name}
								w={'20%'}
								label="Name"
								value={productDetails.name}
								onChange={(e) =>
									setProductDetails({ ...productDetails, name: e.target.value })
								}
							/>
							<TextInput
								placeholder={company}
								w={'20%'}
								label="Company"
								value={productDetails.company}
								onChange={(e) =>
									setProductDetails({
										...productDetails,
										company: e.target.value,
									})
								}
							/>
							<MultiSelect
								data={data}
								label="Tags"
								w={'20%'}
								placeholder={`${tags}`}
								value={productTags}
								onChange={setProductTags}
							/>
							<NumberInput
								placeholder={`${price}`}
								w={'20%'}
								label="Price"
								hideControls
								value={productPrice}
								onChange={setProductPrice}
							/>
						</Flex>
						<Flex mt={20} justify={'space-between'}>
							<TextInput
								placeholder={weight}
								w={'20%'}
								label="Weight"
								value={productDetails.weight}
								onChange={(e) =>
									setProductDetails({
										...productDetails,
										weight: e.target.value,
									})
								}
							/>
							<TextInput
								placeholder={type}
								w={'20%'}
								label="Type"
								value={productDetails.type}
								onChange={(e) =>
									setProductDetails({
										...productDetails,
										type: e.target.value,
									})
								}
							/>
							<Textarea
								w={'50%'}
								label="Description"
								placeholder={description}
								minRows={2}
								value={productDetails.description}
								onChange={(e) =>
									setProductDetails({
										...productDetails,
										description: e.target.value,
									})
								}
							/>
						</Flex>
					</Flex>
					<Divider mt={30} mb={20} w={'100%'} />
					<Flex>
						<Button color="green" onClick={() => editMutation.mutate()}>
							Update
						</Button>
						<Button ml={10} color="gray" onClick={handleCancel}>
							Cancel
						</Button>
						<Tooltip
							label="Currently disabled for demonstration reason."
							color="gray"
							c={'black'}
							position="left"
							withArrow
						>
							<Button ml={'auto'} color="red">
								Delete
							</Button>
						</Tooltip>
					</Flex>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}

export default ProductComponent;
