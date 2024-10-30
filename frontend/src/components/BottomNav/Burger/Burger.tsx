import classNames from 'classnames';
import Hamburger from 'hamburger-react';
import styles from './Burger.module.scss';

interface BurgerProps {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined;
	customStyle?: string;
}

export const Burger = ({ isOpen, setOpen, customStyle }: BurgerProps) => {
	return (
		<div
			className={classNames(styles.burger, {
				[styles.burger__open]: isOpen,
			})}
		>
			<Hamburger toggled={isOpen} toggle={setOpen} />
		</div>
	);
};
