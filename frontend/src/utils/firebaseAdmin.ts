const admin = require('firebase-admin');
const path = require('path');

// Инициализация Admin SDK с использованием файла конфигурации
admin.initializeApp({
	credential: admin.credential.cert(
		path.resolve(__dirname, '../config/serviceAccountKey.json')
	),
});

const setCustomClaims = async (uid: string) => {
	try {
		await admin.auth().setCustomUserClaims(uid, { admin: true });
		console.log(`User ${uid} is now an admin.`);
	} catch (error) {
		console.error('Failed to set custom claims:', error);
	}
};

// Вставьте UID пользователя, которого хотите назначить администратором
setCustomClaims('uyE0zT1cABYT0e4FjZ3AwzbhjYD2');
