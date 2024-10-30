import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../common/generall.scss';
import '../common/reset.scss';
import useCustomMediaQueries from '../hooks/useCustomMediaQueries';

import AppRouter from 'router/AppRouter';
import { AppInitializer } from '../router/AppInitializer';
import { BottomNav } from './BottomNav';
import { Footer } from './sections/Footer';
import { Header } from './sections/Header';
import { MainHeader } from './sections/MainHeader';

const Wrapper = () => {
	const location = useLocation();
	const [isOpen, setOpen] = useState<boolean>(false);
	const { isSmallScreen, isMediumScreen } = useCustomMediaQueries();
	const isLoginPage = location.pathname === '/';

	return (
		<div className='wrapper'>
			<Header isOpen={isOpen} setOpen={setOpen} />
			{isLoginPage && <MainHeader />}
			<main>
				<AppRouter />
			</main>
			<Footer />
			{(!isSmallScreen || !isMediumScreen) && (
				<BottomNav isOpen={isOpen} setOpen={setOpen} />
			)}
			<AppInitializer />
		</div>
	);
};

export default Wrapper;
