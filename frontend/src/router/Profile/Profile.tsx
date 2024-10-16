import { Container } from 'components/Container';
import { getAuth, signOut } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from 'store/reducers/UserSlice';
import styles from './Profile.module.scss';

const Profile = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { name } = useAppSelector(state => state.userReducer);

	const handleLogout = () => {
		signOut(getAuth()).then(() => {
			dispatch(removeUser());
			navigate('/login');
		});
		localStorage.removeItem('user');
	};

	return (
		<Container section>
			<div className={styles.profile}>
				<h1>Welcome, {name}</h1>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</Container>
	);
};

export { Profile };
