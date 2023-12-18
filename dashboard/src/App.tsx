import MainComponent from './components/main/MainComponent';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function App() {
	const token: string | null =
		window.localStorage.getItem('Token') &&
		JSON.parse(window.localStorage.getItem('Token') || '{}').value;
	const history = useHistory();

	useEffect(() => {
		if (!token) {
			history.replace('/auth');
		}
	}, [history, token]);

	return (
		<>
			<MainComponent />
		</>
	);
}

export default App;
