import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
	static getInitialProps = getInitialProps;

	render() {
		return (
			<Html>
				<Head>
					<link
						href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&display=swap"
						rel="stylesheet"
					/>

					<link
						href="https://fonts.googleapis.com/css?family=Kaushan Script"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
