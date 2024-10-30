import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styles from './CustomButton.module.scss';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: () => void;
	className?: string;
	text: string;
	type?: 'button' | 'submit' | 'reset';
	to?: string; // Если передан, рендерим как Link
}

export const CustomButton = ({
	onClick,
	className,
	text,
	type = 'button',
	to,
	...props
}: CustomButtonProps) => {
	if (to) {
		return (
			<Link className={classNames(styles.customButton, className)} to={to}>
				<strong>{text}</strong>
			</Link>
		);
	}
	return (
		<button
			onClick={onClick}
			className={classNames(styles.customButton, className)}
			type={type}
			{...props}
		>
			<strong>{text}</strong>
		</button>
	);
};
