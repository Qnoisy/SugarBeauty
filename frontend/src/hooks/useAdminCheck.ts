import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const useAdminCheck = () => {
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const auth = getAuth();

		const checkAdminClaim = async (user: any) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult(true);
				if (idTokenResult.claims.admin) {
					setIsAdmin(true);
				} else {
					setIsAdmin(false);
				}
			} else {
				setIsAdmin(false);
			}
		};

		const unsubscribe = onAuthStateChanged(auth, user => {
			checkAdminClaim(user);
		});

		return () => unsubscribe();
	}, []);

	return isAdmin;
};

export default useAdminCheck;
