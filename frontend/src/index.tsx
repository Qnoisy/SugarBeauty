import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Wrapper from './components/wrapper';
import './firebase';
import { store } from './store/store';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Wrapper />
		</BrowserRouter>
	</Provider>
);
