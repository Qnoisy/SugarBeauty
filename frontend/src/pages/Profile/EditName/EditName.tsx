import { CustomButton } from 'components/UI/CustomButton';
import { CustomInput } from 'components/UI/CustomInput';
import { updateProfile } from 'firebase/auth';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { auth } from 'utils/firebase';
import { editProfileSchema } from 'utils/userShema';
import styles from './EditName.module.scss';

const EditName: React.FC = () => {
	const currentUser = auth.currentUser;
	const [isEditing, setIsEditing] = useState(false);

	const initialValues = {
		name: currentUser?.displayName || '',
	};

	const handleSave = async (values: typeof initialValues) => {
		if (!currentUser) {
			console.error('User is not authenticated');
			return;
		}

		try {
			// Обновление имени пользователя в Firebase Auth
			if (values.name && values.name !== currentUser.displayName) {
				await updateProfile(currentUser, { displayName: values.name });
				console.log('Name updated successfully!');
				alert('Имя успешно обновлено!');
				setIsEditing(false); // Закрываем блок после сохранения
			}
		} catch (error) {
			console.error('Error updating name:', error);
			alert('Ошибка при обновлении имени. Попробуйте снова.');
		}
	};

	return (
		<div className={styles.editName}>
			{isEditing ? (
				<Formik
					initialValues={initialValues}
					validationSchema={editProfileSchema}
					onSubmit={handleSave}
				>
					{() => (
						<Form>
							<CustomInput label='Imię' name='name' placeholder='Введите имя' />
							<div className={styles.editName__form}>
								<CustomButton type='submit' text='Save' />
								<CustomButton
									type='button'
									text='anulować'
									onClick={() => setIsEditing(false)}
								/>
							</div>
						</Form>
					)}
				</Formik>
			) : (
				<CustomButton text='zmienić imię?' onClick={() => setIsEditing(true)} />
			)}
		</div>
	);
};

export default EditName;
