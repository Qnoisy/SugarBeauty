import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Container } from '../../Container';
import { CustomButton } from '../../UI/CustomButton';
import styles from './MainHeader.module.scss';

export const MainHeader = () => {
	const [animate, setAnimate] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => {
			setAnimate(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={classNames(styles.mainHeader, {
				[styles['animate']]: animate,
			})}
		>
			<div className={styles.mainHeader__img}>
				<img src='img/frame1.jpg' alt='' />
			</div>
			<Container section customStyle={styles.mainHeader__Container}>
				<div className={styles.mainHeader__block}>
					<h1 className={styles.mainHeader__title}>
						<strong>SugarBeauty.salon</strong>
					</h1>
					<h2 className={styles['mainHeader__sub-title']}>
						<strong>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Reiciendis, officia!
						</strong>
					</h2>
					<CustomButton text='button' className={styles.mainHeader__btn} />
				</div>
			</Container>
		</div>
	);
};
