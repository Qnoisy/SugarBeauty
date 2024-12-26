import { CustomButton } from 'components/UI/CustomButton';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from 'utils/firebase';
import styles from './UserManagement.module.scss';

interface User {
	id: string;
	name: string;
	role: string;
}

const UserManagement: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [searchTerm, setSearchTerm] = useState('');

	// Fetch all users from Firestore
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'users'));
				const usersData = querySnapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				})) as User[];
				setUsers(usersData);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, []);

	// Search users by name
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	// Delete user
	const handleDeleteUser = async (userId: string) => {
		try {
			const userDocRef = doc(db, 'users', userId);
			await deleteDoc(userDocRef);
			setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
			alert('User deleted successfully!');
		} catch (error) {
			console.error('Error deleting user:', error);
			alert('Failed to delete user');
		}
	};

	return (
		<section className={styles.userManagement}>
			<h2>Управление пользователями</h2>
			<input
				type='text'
				placeholder='Найти пользователя по имени'
				value={searchTerm}
				onChange={handleSearch}
				className={styles.searchInput}
			/>
			<ul className={styles.userList}>
				{users
					.filter(user =>
						user.name.toLowerCase().includes(searchTerm.toLowerCase())
					)
					.map(user => (
						<li key={user.id} className={styles.userItem}>
							<span>
								{user.name} - {user.role}
							</span>
							<div className={styles.actions}>
								<CustomButton
									onClick={() => handleDeleteUser(user.id)}
									text='Удалить'
								/>
							</div>
						</li>
					))}
			</ul>
		</section>
	);
};

export default UserManagement;
