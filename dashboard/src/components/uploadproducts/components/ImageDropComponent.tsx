import { Group, useMantineTheme, rem, Text, Box } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import {
	Dropzone,
	DropzoneProps,
	FileWithPath,
	IMAGE_MIME_TYPE,
} from '@mantine/dropzone';

interface ImageInterface extends Partial<DropzoneProps> {
	setimage: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
	setshowimage: React.Dispatch<React.SetStateAction<string>>;
}

function ImageDropComponent(props: ImageInterface) {
	const theme = useMantineTheme();

	const handleImageDrop = (files: FileWithPath[]) => {
		props.setimage(files);

		if (files[0]) {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				if (e.target) {
					props.setshowimage(e.target.result as string);
				}
			};

			reader.readAsDataURL(files[0]);
		}
	};

	return (
		<Dropzone
			onDrop={handleImageDrop}
			onReject={(files) => console.log('rejected files', files)}
			maxSize={3 * 1024 ** 2}
			accept={IMAGE_MIME_TYPE}
			{...props}
		>
			<Group
				position="center"
				spacing="xl"
				style={{ minHeight: rem(220), pointerEvents: 'none' }}
			>
				<Dropzone.Accept>
					<IconUpload
						size="3.2rem"
						stroke={1.5}
						color={
							theme.colors[theme.primaryColor][
								theme.colorScheme === 'dark' ? 4 : 6
							]
						}
					/>
				</Dropzone.Accept>
				<Dropzone.Reject>
					<IconX
						size="3.2rem"
						stroke={1.5}
						color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
					/>
				</Dropzone.Reject>
				<Dropzone.Idle>
					<IconPhoto size="3.2rem" stroke={1.5} />
				</Dropzone.Idle>

				<Box w={500}>
					<Text size="xl" inline>
						Drag images here or click to select files
					</Text>
					<Text size="sm" color="dimmed" inline mt={7}>
						Attach only one file, each file should not exceed 5mb
					</Text>
				</Box>
			</Group>
		</Dropzone>
	);
}

export default ImageDropComponent;
