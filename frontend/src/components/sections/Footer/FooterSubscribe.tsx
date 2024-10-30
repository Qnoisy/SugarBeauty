import styles from './Footer.module.scss';
import { FooterForm } from './FooterForm';

export const FooterSubscribe = () => {
	return (
		<div className={styles.block3}>
			<div className={styles.footerForm}>
				<h2 className={styles.footer__title}>
					<strong>Stay Informed</strong>
				</h2>
				<FooterForm />
			</div>
		</div>
	);
};
