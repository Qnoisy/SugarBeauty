import styles from './CustomSelect.module.scss';

interface CustomSelectProps {
	options: any;
}

export const CustomSelect = ({ options }: CustomSelectProps) => {
	return (
		<select className={styles.customSelect}>
			{/* {options.map(option => (
				<option key={option.value} value={option.value}>
					{option.name}
				</option>
			))} */}
		</select>
	);
};
