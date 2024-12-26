import { collection, getDocs } from 'firebase/firestore';
import { db } from 'utils/firebase';

// Функция для получения данных админ-панели
export const fetchAdminDataFromFirestore = async () => {
	try {
		// Получаем все документы из коллекции "users"
		const usersSnapshot = await getDocs(collection(db, 'users'));
		const totalUsers = usersSnapshot.size;

		// Считаем количество администраторов
		const adminUsers = usersSnapshot.docs.filter(
			doc => doc.data()?.role === 'admin'
		).length;

		// Получаем все документы из коллекции "gallery"
		const gallerySnapshot = await getDocs(collection(db, 'gallery'));
		const galleryItems = gallerySnapshot.size;

		// Возвращаем собранные данные
		return { totalUsers, adminUsers, galleryItems };
	} catch (error) {
		console.error('Ошибка при получении данных из Firestore:', error);
		throw new Error('Не удалось загрузить данные админ-панели');
	}
};
