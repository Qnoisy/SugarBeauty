import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
	children: ReactNode;
	section?: boolean;
	customStyle?: string;
}

export const Container = ({
	children,
	section = false,
	customStyle,
}: ContainerProps) => {
	return (
		<div
			className={classNames(
				styles.container,
				{
					[styles['container__padding-disabled']]: !section,
				},
				customStyle
			)}
		>
			{children}
		</div>
	);
};
