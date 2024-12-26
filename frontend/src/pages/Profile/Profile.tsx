import { Container } from 'components/Container';
import { CustomButton } from 'components/UI/CustomButton';
import { getAuth, signOut } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import useAdminCheck from 'hooks/useAdminCheck';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUser } from 'store/reducers/UserSlice';
import { auth } from 'utils/firebase';
import EditName from './EditName/EditName';
import styles from './Profile.module.scss';

export const Profile: React.FC = () => {
	const currentUser = auth.currentUser;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user } = useAppSelector(state => state.user);
	const isAdmin = useAdminCheck();

	const handleLogout = async () => {
		await signOut(getAuth());
		dispatch(removeUser());
		localStorage.removeItem('user');
		navigate('/signIn');
	};

	return (
		<Container section>
			<article className={styles.profile}>
				<h1 className={styles['profile__title']}>
					<strong>Profil</strong>
				</h1>

				<header className={styles['profile__header']}>
					<section className={styles['profile__user-info']}>
						<div className={styles['profile__avatar']}>
							<img
								src={currentUser?.photoURL || '/img/default-avatar.png'}
								alt={user?.name || 'User Photo'}
							/>
						</div>
						<div className={styles['profile__details']}>
							<p className={styles['profile__field']}>
								<strong>imię:</strong> {user?.name}
							</p>
							<p className={styles['profile__field']}>
								<strong>E-mail:</strong> {user?.email}
							</p>
						</div>
						<div className={styles['profile__actions']}>
							<CustomButton onClick={handleLogout} text='Wyloguj' />
							{isAdmin && <CustomButton text='Admin' to='/admin' />}
						</div>
					</section>
				</header>
				<EditName />
			</article>
		</Container>
	);
};

export default Profile;
