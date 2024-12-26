import { useAppDispatch, useAppSelector } from 'hooks/redux'; // Ваши кастомные хуки
import React, { useEffect } from 'react';

import { fetchAdminData } from 'store/reducers/adminSlice';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const { stats, loading, error } = useAppSelector(state => state.admin);

	useEffect(() => {
		dispatch(fetchAdminData());
	}, [dispatch]);

	if (loading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка: {error}</div>;

	return (
		<section className={styles.dashboard}>
			<h2>Dashboard</h2>
			<div className={styles.stats}>
				<p>Всего пользователей: {stats.totalUsers}</p>
				<p>Администраторов: {stats.adminUsers}</p>
				<p>Галерея: {stats.galleryItems} изображений</p>
			</div>
		</section>
	);
};

export default Dashboard;
