import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { db, storage } from 'utils/firebase';
import styles from './Gallery.module.scss';

const Gallery: React.FC = () => {
	const [images, setImages] = useState<{ id: string; url: string }[]>([]);

	const fetchImages = async () => {
		const querySnapshot = await getDocs(collection(db, 'gallery'));
		const imagesData = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		})) as { id: string; url: string }[];
		setImages(imagesData);
	};

	const handleDelete = async (imageId: string) => {
		if (window.confirm('Are you sure you want to delete this image?')) {
			try {
				const imageDocRef = doc(db, 'gallery', imageId);
				const imageStorageRef = ref(storage, `gallery/${imageId}`);

				await deleteDoc(imageDocRef);
				await deleteObject(imageStorageRef);

				setImages(prevImages =>
					prevImages.filter(image => image.id !== imageId)
				);
				alert('Image deleted successfully!');
			} catch (error) {
				console.error('Error deleting image:', error);
			}
		}
	};

	useEffect(() => {
		fetchImages();
	}, []);

	return (
		<div className={styles.galleryContainer}>
			{images.map(image => (
				<div key={image.id} className={styles.imageItem}>
					<img src={image.url} alt='Gallery Item' />
					<button onClick={() => handleDelete(image.id)}>Delete</button>
				</div>
			))}
		</div>
	);
};

export default Gallery;
