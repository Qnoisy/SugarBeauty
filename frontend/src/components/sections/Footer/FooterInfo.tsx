import styles from './Footer.module.scss';

export const FooterInfo = () => {
	return (
		<div className={styles.block1}>
			<h2 className={styles.footer__title}>
				<strong>sugarbeauty.salon</strong>
			</h2>
			<p className={styles.footer__info}>Szosa Lubicka 166H, 87-100 Toruń</p>
			<p className={styles.footer__info}>
				Jesteśmy otwarci od poniedziałku do niedzieli
			</p>
			<p className={styles.footer__info}>8 AM – 8 PM</p>
			<h3 className={styles.footer__subTitle}>
				<strong>kierownik</strong>
			</h3>
			<p className={styles.footer__info}>Victoriia Prudyvus</p>
		</div>
	);
};
