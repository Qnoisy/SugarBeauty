import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const useAdminCheck = () => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [checked, setChecked] = useState(false); // Для предотвращения повторных проверок

	useEffect(() => {
		const auth = getAuth();

		const checkAdminClaim = async (user: any) => {
			if (user && !checked) {
				// Принудительно обновляем токен
				const idTokenResult = await user.getIdTokenResult(true);

				// Проверяем Custom Claim `admin`
				if (idTokenResult.claims.admin) {
					setIsAdmin(true);
				} else {
					setIsAdmin(false);
				}

				setChecked(true); // Проверка завершена
			}
		};

		const unsubscribe = onAuthStateChanged(auth, user => {
			checkAdminClaim(user);
		});

		return () => unsubscribe();
	}, [checked]);

	return isAdmin;
};

export default useAdminCheck;
