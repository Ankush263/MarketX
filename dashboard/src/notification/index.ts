import { notifications } from '@mantine/notifications';

export const callErrorNotification = (message: string) => {
	notifications.show({
		color: 'red',
		title: 'Error',
		message: message,
		autoClose: 10000,
		styles: (theme) => ({
			root: {
				backgroundColor: theme.colors.red[6],
				borderColor: theme.colors.red[6],

				'&::before': { backgroundColor: theme.white },
			},

			title: { color: theme.white },
			description: { color: theme.white },
			closeButton: {
				color: theme.white,
				'&:hover': { backgroundColor: theme.colors.red[7] },
			},
		}),
	});
};

export const callSuccessNotification = (message: string) => {
	notifications.show({
		color: 'green',
		title: 'Success',
		message: message,
		autoClose: 10000,
		styles: (theme) => ({
			root: {
				backgroundColor: theme.colors.green[6],
				borderColor: theme.colors.green[6],

				'&::before': { backgroundColor: theme.white },
			},

			title: { color: theme.white },
			description: { color: theme.white },
			closeButton: {
				color: theme.white,
				'&:hover': { backgroundColor: theme.colors.green[7] },
			},
		}),
	});
};
