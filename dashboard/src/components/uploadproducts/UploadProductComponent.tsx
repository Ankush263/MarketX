import {
	Flex,
	MultiSelect,
	NumberInput,
	Text,
	Button,
	TextInput,
	Textarea,
	Image,
} from '@mantine/core';
import ImageDropComponent from './components/ImageDropComponent';
import { useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import { createProduct } from '../../api';
import { useMutation, QueryClient } from '@tanstack/react-query';
import { getToken } from '../../token';
import { callSuccessNotification } from '../../notification';

interface ProductDetailsInterface {
	name: string;
	company: string;
	description: string;
	weight: string;
	type: string;
}

function UploadProductComponent() {
	const data = [
		{ value: 'sale', label: 'Sale' },
		{ value: 'toys', label: 'Toys' },
		{ value: 'new', label: 'New' },
		{ value: 'exclusive', label: 'Exclusive' },
	];
	const [productDetails, setProductDetails] = useState<ProductDetailsInterface>(
		{
			name: '',
			company: '',
			description: '',
			weight: '',
			type: '',
		}
	);
	const [price, setPrice] = useState<number | ''>(0);
	const [tags, setTags] = useState<string[]>(['']);
	const [image, setImage] = useState<FileWithPath[]>([]);
	const [showImage, setShowImage] = useState<string>('');
	const queryClient = new QueryClient();

	const handleCreate = async () => {
		const token = getToken();
		const formData = new FormData();

		formData.append('name', productDetails.name);
		formData.append('company', productDetails.company);
		formData.append('description', productDetails.description);
		formData.append('image', image[0]);
		formData.append('price', price as string);
		tags.forEach((tag) => formData.append('tags', tag));
		formData.append('weight', productDetails.weight);
		formData.append('type', productDetails.type);

		await createProduct(token, formData);
	};

	const handleCreateMutation = useMutation({
		mutationFn: handleCreate,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
			callSuccessNotification('Successfully created a new product');
			reset();
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const reset = () => {
		setProductDetails({
			name: '',
			company: '',
			description: '',
			weight: '',
			type: '',
		});
		setPrice(0);
		setTags(['']);
		setImage([]);
		setShowImage('');
	};

	return (
		<Flex direction={'column'} w={'100%'}>
			<Text fz={35} color="white" mt={100} ml={50}>
				Create a new product
			</Text>
			<Text color="gray" fz={12} ml={50}>
				Please make sure to provide all the necessary information in the form.
			</Text>
			<Flex ml={80} mt={50} w={'90%'} justify={'space-between'}>
				<Flex direction={'column'}>
					<Text color="white" fz={18} fw={500}>
						Product Details
					</Text>
					<Text color="gray" fz={12} fw={500}>
						Please provide the name and description of the product.
					</Text>
				</Flex>
				<Flex direction={'column'} ml={20} w={'70%'}>
					<Text color="white" fz={15} fw={500} mb={10}>
						Product Name:
					</Text>
					<TextInput
						placeholder="Product Name"
						size="md"
						value={productDetails.name}
						onChange={(e) =>
							setProductDetails({ ...productDetails, name: e.target.value })
						}
					/>
					<Text color="white" fz={15} fw={500} mt={30} mb={10}>
						Description:
					</Text>
					<Textarea
						placeholder="Description"
						minRows={10}
						mb={30}
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
			<Flex ml={80} mt={30} w={'90%'} justify={'space-between'}>
				<Flex direction={'column'}>
					<Text color="white" fz={18} fw={500}>
						Images
					</Text>
					<Text color="gray" fz={12} fw={500}>
						Images will appear in the store front of your website.
					</Text>
				</Flex>
				{image.length > 0 ? (
					<Flex w={400}>
						<Image src={showImage} radius={'md'} />
					</Flex>
				) : (
					<ImageDropComponent setimage={setImage} setshowimage={setShowImage} />
				)}
			</Flex>
			<Flex ml={80} mt={30} w={'90%'} justify={'space-between'}>
				<Flex direction={'column'}>
					<Text color="white" fz={18} fw={500}>
						Pricing
					</Text>
					<Text color="gray" fz={12} fw={500}>
						Product price must be higher than 0.
					</Text>
				</Flex>
				<Flex direction={'column'} w={'60%'}>
					<Text color="white" fz={15} fw={500} mb={10}>
						Price:
					</Text>
					<NumberInput
						hideControls
						placeholder="Price"
						min={0}
						value={price}
						onChange={setPrice}
					/>
				</Flex>
			</Flex>
			<Flex ml={80} mt={30} w={'90%'} justify={'space-between'}>
				<Flex direction={'column'}>
					<Text color="white" fz={18} fw={500}>
						Branding
					</Text>
					<Text color="gray" fz={12} fw={500}>
						Please provide the name of the company
					</Text>
				</Flex>
				<Flex direction={'column'} w={'60%'}>
					<Text color="white" fz={15} fw={500} mb={10}>
						Company:
					</Text>
					<TextInput
						placeholder="Company"
						value={productDetails.company}
						onChange={(e) =>
							setProductDetails({ ...productDetails, company: e.target.value })
						}
					/>
				</Flex>
			</Flex>
			<Flex ml={80} mt={50} w={'90%'} justify={'space-between'} mb={30}>
				<Flex direction={'column'}>
					<Text color="white" fz={18} fw={500}>
						Besic Details
					</Text>
					<Text color="gray" fz={12} fw={500}>
						Provide the other details of the product.
					</Text>
				</Flex>
				<Flex direction={'column'} w={'60%'}>
					<Text color="white" fz={15} fw={500} mb={10}>
						Tags in toys:
					</Text>
					<MultiSelect
						data={data}
						placeholder="Pick all that you like"
						mb={30}
						value={tags}
						onChange={setTags}
					/>
					<Text color="white" fz={15} fw={500} mb={10}>
						Weight:
					</Text>
					<TextInput
						placeholder="Weight"
						mb={30}
						value={productDetails.weight}
						onChange={(e) =>
							setProductDetails({ ...productDetails, weight: e.target.value })
						}
					/>
					<Text color="white" fz={15} fw={500} mb={10}>
						Type of the toy:
					</Text>
					<TextInput
						placeholder="Type"
						mb={30}
						value={productDetails.type}
						onChange={(e) =>
							setProductDetails({ ...productDetails, type: e.target.value })
						}
					/>
				</Flex>
			</Flex>
			<Flex mb={50} justify={'end'} w={'96.5%'}>
				<Button color="gray" onClick={reset}>
					Cancel
				</Button>
				<Button ml={10} onClick={() => handleCreateMutation.mutate()}>
					Create
				</Button>
			</Flex>
		</Flex>
	);
}

export default UploadProductComponent;
