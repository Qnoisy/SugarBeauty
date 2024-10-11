import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CustomLoader } from '../components/UI/CustomLoader';
import { useAppSelector } from '../hooks/redux';
import { privateRoutes, publicRoutes } from '../router';
const AppRouter = () => {
	const { isAuth, isLoading } = useAppSelector(state => state.userReducer);
	console.log('isAuth', isAuth);
	if (isLoading) {
		return <CustomLoader />;
	}
	return isAuth ? (
		<Routes>
			{privateRoutes.map((route, index) => (
				<Route key={index} path={route.path} element={route.component} />
			))}
			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	) : (
		<Routes>
			{publicRoutes.map((route, index) => (
				<Route key={index} path={route.path} element={route.component} />
			))}
			<Route path='*' element={<Navigate to='/SignIn' replace />} />
		</Routes>
	);
};

export default React.memo(AppRouter);
