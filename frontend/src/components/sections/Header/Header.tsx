import useCustomMediaQueries from '../../../hooks/useCustomMediaQueries';
import { menuItems } from '../../../router';
import { Burger } from '../../BottomNav/Burger';
import { BurgerModal } from '../../BottomNav/BurgerModal';
import { Container } from '../../Container';
import { Logo } from '../../Logo';
import { CustomNav } from '../../UI/CustomNav';
import styles from './Header.module.scss';
import { Search } from './Search';

interface HeaderProps {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ isOpen, setOpen }: HeaderProps) => {
	const { isMediumScreen, isLargeScreen } = useCustomMediaQueries();
	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.header__row}>
					{(isLargeScreen || isMediumScreen) && (
						<div className={styles.header__logo}>
							<Logo />
							<CustomNav items={menuItems} />
						</div>
					)}
					<Search />
					{(isLargeScreen || isMediumScreen) && (
						<Burger isOpen={isOpen} setOpen={setOpen} />
					)}
				</div>
				<BurgerModal isActive={isOpen} setIsActive={setOpen}>
					<CustomNav customStyles={styles.customNav__style} items={menuItems} />
				</BurgerModal>
			</Container>
		</header>
	);
};
