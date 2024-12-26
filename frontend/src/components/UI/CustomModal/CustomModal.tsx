import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './CustomModal.module.scss';

interface CustomModalProps {
	isActive: boolean;
	setIsActive: (value: React.SetStateAction<boolean>) => void;
	children: ReactNode;
}

export const CustomModal = ({
	isActive,
	setIsActive,
	children,
}: CustomModalProps) => {
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsActive(false);
		}
	};
	return (
		<div
			onClick={handleClick}
			className={classNames(styles.customModal, {
				[styles.active]: isActive,
			})}
		>
			<div
				className={classNames(
					styles.customModal__content,
					styles['shadow-drop-2-center']
				)}
			>
				{children}
			</div>
		</div>
	);
};
