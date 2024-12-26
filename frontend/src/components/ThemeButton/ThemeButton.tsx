import classNames from 'classnames';
import { MdLightMode, MdOutlineLightMode } from 'react-icons/md';
import { useTheme } from '../../hooks/useTheme'; // Импортируем хук useTheme
import styles from './ThemeButton.module.scss';

interface ThemeButtonProps {
	className?: string;
}

export const ThemeButton = ({ className }: ThemeButtonProps) => {
	const { theme, setTheme } = useTheme();
	const handleClickTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
	const Icon = theme === 'light' ? MdOutlineLightMode : MdLightMode;

	return (
		<button
			onClick={handleClickTheme}
			className={classNames(styles.theme__btn, className)}
		>
			<Icon />
		</button>
	);
};
