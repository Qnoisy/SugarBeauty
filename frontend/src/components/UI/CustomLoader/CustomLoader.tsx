import { MutatingDots } from 'react-loader-spinner';
import styles from './CustomLoader.module.scss';

export const CustomLoader = () => {
	return (
		<div className={styles.loader}>
			<MutatingDots
				visible={true}
				height='100'
				width='100'
				color='white'
				secondaryColor='white'
				radius='12.5'
				ariaLabel='mutating-dots-loading'
				wrapperStyle={{}}
				wrapperClass=''
			/>
		</div>
	);
};
