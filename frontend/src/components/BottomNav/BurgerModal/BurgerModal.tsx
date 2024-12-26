import classNames from 'classnames';
import { ReactNode } from 'react';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import styles from './BurgerModal.module.scss';

interface BurgerModalProps {
	isActive: boolean;
	setIsActive: (value: React.SetStateAction<boolean>) => void;
	children: ReactNode;
}

export const BurgerModal = ({
	isActive,
	setIsActive,
	children,
}: BurgerModalProps) => {
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsActive(false);
		}
	};

	useEscapeKey(() => {
		if (isActive) {
			setIsActive(false);
		}
	});

	return (
		<div
			onClick={handleClick}
			className={classNames(styles.burgerModal, {
				[styles.active]: isActive,
			})}
		>
			<div className={styles.burgerModal__content}>
				<div className={styles.burgerModal__content_block}>{children}</div>
			</div>
		</div>
	);
};
