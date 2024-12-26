import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Wrapper from './components/wrapper';
import { store } from './store/store';
import './utils/firebase';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<ToastContainer
				position='bottom-right'
				autoClose={3000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
			<Wrapper />
		</BrowserRouter>
	</Provider>
);
