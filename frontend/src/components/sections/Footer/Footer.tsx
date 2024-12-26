import { Container } from '../../Container';
import { Logo } from '../../Logo';
import styles from './Footer.module.scss';
import { FooterInfo } from './FooterInfo';
import { FooterLegal } from './FooterLegal';
import { FooterNav } from './FooterNav';
import { FooterSocialLinks } from './FooterSocialLinks';
import { FooterSubscribe } from './FooterSubscribe';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Container section>
				<div className={styles.footer__row}>
					<FooterInfo />
					<FooterNav />
					<FooterSubscribe />
				</div>
				<hr className={styles.footer__hr} />
				<div className={styles.footer__row}>
					<FooterLegal />
					<Logo />
					<FooterSocialLinks />
				</div>
			</Container>
		</footer>
	);
};
