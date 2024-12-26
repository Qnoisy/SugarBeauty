import classNames from 'classnames';
import { Container } from '../../../Container';
import { CustomButton } from '../../../UI/CustomButton';
import styles from './MainInfo.module.scss';

// Определяем тип для пропсов
interface MainInfoProps {
	data: {
		id: number;
		title?: string;
		description: string;
		additionalText?: string; // Второй абзац, который может быть опциональным
		image: string;
	};
	imagePosition?: 'left' | 'right'; // Пропс для управления позицией картинки
}

export const MainInfo = ({ data, imagePosition = 'left' }: MainInfoProps) => {
	return (
		<div className={styles.mainInfo}>
			<Container section>
				<div
					className={classNames(styles.mainInfo__block, {
						[styles.rightImage]: imagePosition === 'right',
					})}
				>
					<div className={styles.mainInfo__img}>
						<img src={data.image} alt={data.title || 'Image'} />
					</div>
					<div className={styles.mainInfo__content}>
						{data.title && (
							<h2 className={styles.mainInfo__title}>
								<strong>{data.title}</strong>
							</h2>
						)}
						<p className={styles.mainInfo__text}>{data.description}</p>

						{data.additionalText && (
							<p className={styles.mainInfo__text}>{data.additionalText}</p>
						)}

						<CustomButton text='Подробнее' />
					</div>
				</div>
			</Container>
		</div>
	);
};
