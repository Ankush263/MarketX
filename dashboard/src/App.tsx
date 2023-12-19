import MainComponent from './components/main/MainComponent';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getToken } from './token';

function App() {
	const history = useHistory();
	const token = getToken();

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
