import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { MenuItem } from '../../../router';
import styles from './CustomNav.module.scss';

interface CustomNavProps {
	items: MenuItem[];
	disableAnimation?: boolean;
	customStyles?: string;
}

export const CustomNav = ({
	items,
	disableAnimation = false,
	customStyles,
}: CustomNavProps) => {
	const location = useLocation();

	return (
		<nav className={classNames(styles.customNav, customStyles)}>
			{items.map((item: MenuItem, index: number) => {
				const isActive = location.pathname === item.path;
				return (
					<Link
						key={index}
						to={item.path}
						className={classNames(styles.customNav__items, {
							[styles.active]: isActive,
							[styles.noLine]: disableAnimation,
						})}
					>
						<strong>{item.title}</strong>
					</Link>
				);
			})}
		</nav>
	);
};
