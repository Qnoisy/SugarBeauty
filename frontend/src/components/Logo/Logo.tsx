import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo = () => {
	return (
		<Link to={'/'} className={styles.logo}>
			<img
				style={{ height: '5rem', width: '6rem' }}
				src='/img/logo.svg'
				alt=''
			/>
		</Link>
	);
};
