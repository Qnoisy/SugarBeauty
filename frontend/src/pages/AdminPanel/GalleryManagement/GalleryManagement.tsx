import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	setDoc,
} from 'firebase/firestore';
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
} from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { db, storage } from 'utils/firebase';
import styles from './GalleryManagement.module.scss';

const GalleryManagement: React.FC = () => {
	const [images, setImages] = useState<{ id: string; url: string }[]>([]);
	const [newImage, setNewImage] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	// Подписка на обновления в коллекции галереи
	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, 'gallery'), snapshot => {
			const imagesData = snapshot.docs.map(doc => ({
				id: doc.id,
				...(doc.data() as { url: string }),
			}));
			setImages(imagesData);
		});
		return () => unsubscribe();
	}, []);

	const handleUpload = async () => {
		if (!newImage) return;
		setIsUploading(true);

		const imageId = crypto.randomUUID();
		const storageRef = ref(storage, `gallery/${imageId}`);

		try {
			console.log('Starting uploadBytes...');
			await uploadBytes(storageRef, newImage); // Лог для `uploadBytes`
			console.log('File uploaded to Storage.');

			const downloadURL = await getDownloadURL(storageRef);
			console.log('Download URL obtained:', downloadURL);

			await setDoc(doc(db, 'gallery', imageId), { url: downloadURL });
			console.log('Document created in Firestore.');

			setNewImage(null); // Сбросить выбранное изображение
			alert('Image uploaded successfully!');
		} catch (error) {
			console.error('Error during upload:', error);
			alert('Error uploading image.');
		} finally {
			setIsUploading(false);
		}
	};

	// Обработчик удаления изображения
	const handleDelete = async (imageId: string) => {
		if (!window.confirm('Are you sure you want to delete this image?')) return;

		try {
			await deleteDoc(doc(db, 'gallery', imageId));
			const storageRef = ref(storage, `gallery/${imageId}`);
			await deleteObject(storageRef);
			alert('Image deleted successfully!');
		} catch (error) {
			console.error('Error deleting image:', error);
			alert('Ошибка при удалении изображения.');
		}
	};

	return (
		<section className={styles.galleryManagement}>
			<h2>Управление галереей</h2>

			<div className={styles.uploadSection}>
				<input
					type='file'
					onChange={e => setNewImage(e.target.files ? e.target.files[0] : null)}
					accept='image/*'
				/>
				<button onClick={handleUpload} disabled={isUploading || !newImage}>
					{isUploading ? 'Uploading...' : 'Добавить изображение'}
				</button>
			</div>

			<ul className={styles.imageList}>
				{images.map(image => (
					<li key={image.id} className={styles.imageItem}>
						<img src={image.url} alt='Gallery Item' />
						<button onClick={() => handleDelete(image.id)}>Удалить</button>
					</li>
				))}
			</ul>
		</section>
	);
};

export default GalleryManagement;
