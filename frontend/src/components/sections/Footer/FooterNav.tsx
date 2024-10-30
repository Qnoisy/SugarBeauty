import { menuItems } from '../../../router';
import { CustomNav } from '../../UI/CustomNav';
import styles from './Footer.module.scss';

export const FooterNav = () => {
	return (
		<div className={styles.block2}>
			<CustomNav
				items={menuItems}
				customStyles={styles.footer__nav}
				disableAnimation
			/>
		</div>
	);
};
