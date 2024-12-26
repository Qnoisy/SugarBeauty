import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CustomLoader } from '../components/UI/CustomLoader';
import { useAppSelector } from '../hooks/redux';
import { privateRoutes, publicRoutes } from '../router';

const AppRouter: React.FC = () => {
	const { isAuth, isLoading } = useAppSelector(state => state.user);

	if (isLoading) {
		return <CustomLoader />;
	}

	return (
		<Routes>
			{isAuth
				? privateRoutes.map((route, index) => (
						<Route key={index} path={route.path} element={route.component} />
				  ))
				: publicRoutes.map((route, index) => (
						<Route key={index} path={route.path} element={route.component} />
				  ))}
			<Route path='*' element={<Navigate to={isAuth ? '/' : '/signIn'} />} />
		</Routes>
	);
};

export default React.memo(AppRouter);
