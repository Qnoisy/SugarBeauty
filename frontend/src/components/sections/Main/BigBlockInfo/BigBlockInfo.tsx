import { Container } from '../../../Container';
import { CustomButton } from '../../../UI/CustomButton';
import styles from './BigBlockInfo.module.scss';

// interface BigBlockInfoProps {}

export const BigBlockInfo = () => {
	return (
		<div className={styles.bigBlockInfo}>
			<Container section>
				<div className={styles.bigBlockInfo__content}>
					<div className={styles.bigBlockInfo__img}>
						<img src='img/frame3.JPG' alt='' />
						<div className={styles.bigBlockInfo__row}>
							<div className={styles.bigBlockInfo__title}>
								<strong>Lorem ipsum dolor sit amet.</strong>
							</div>
							<CustomButton
								className={styles.bigBlockInfo__btn}
								text='about me'
							/>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};
