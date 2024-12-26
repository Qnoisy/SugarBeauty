import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import styles from './Footer.module.scss';

export const FooterSocialLinks = () => {
	return (
		<div className={styles.subBlock3}>
			<ul className={styles.footer__social}>
				<a
					href='https://www.facebook.com/viktoriiaprudyvus'
					aria-label='Facebook'
				>
					<FaFacebookF className={styles.footer__icon} />
				</a>
				<a
					href='https://www.instagram.com/sugarbeauty.salon/'
					aria-label='Instagram'
				>
					<FaInstagram className={styles.footer__icon} />
				</a>
				<a href='https://www.tiktok.com/@victoriaprudyvus' aria-label='Tiktok'>
					<FaTiktok className={styles.footer__icon} />
				</a>
			</ul>
		</div>
	);
};
