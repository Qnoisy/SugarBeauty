import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { menuItems } from '../../router';
import { ThemeButton } from '../ThemeButton';
import { CustomNav } from '../UI/CustomNav';
import styles from './BottomNav.module.scss';
import { Burger } from './Burger';
import { BurgerModal } from './BurgerModal';

interface BottomNavProps {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BottomNav = ({ isOpen, setOpen }: BottomNavProps) => {
	return (
		<>
			<nav className={styles.bottomNav}>
				<div className={styles.bottomNav__links}>
					<Link to={'/'} className={styles.bottomNav__link}>
						<BsFillEmojiSmileFill />
					</Link>
					<Link to={'/'} className={styles.bottomNav__link}>
						<BsFillEmojiSmileFill />
					</Link>
				</div>
				<div className={styles.navBurger}>
					<Burger isOpen={isOpen} setOpen={setOpen} />
				</div>
				<div className={styles.bottomNav__links}>
					<ThemeButton />
					<Link to={'/'} className={styles.bottomNav__link}>
						<BsFillEmojiSmileFill />
					</Link>
				</div>
			</nav>
			<div className={styles.navBurgerBottom}></div>
			<BurgerModal isActive={isOpen} setIsActive={setOpen}>
				<div style={{ textAlign: 'center' }}>
					<CustomNav customStyles={styles.customNav__style} items={menuItems} />
				</div>
			</BurgerModal>
		</>
	);
};
