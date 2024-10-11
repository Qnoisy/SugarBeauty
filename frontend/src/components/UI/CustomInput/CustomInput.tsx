import classNames from 'classnames';
import { useField } from 'formik';
import { forwardRef } from 'react';
import styles from './CustomInput.module.scss';

interface CustomInputProps {
	label?: string;
	name: string;
	type?: string;
	placeholder: string;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
	({ label, name, type = 'text', placeholder }, ref) => {
		const [field, meta] = useField(name);

		return (
			<div className={styles.inputWrapper}>
				{label && (
					<label htmlFor={name} className={styles.label}>
						<strong>{label}</strong>
					</label>
				)}
				<input
					{...field}
					id={name}
					type={type}
					placeholder={placeholder}
					ref={ref}
					className={classNames(styles.customInput, {
						[styles.error]: meta.touched && meta.error,
					})}
				/>
			</div>
		);
	}
);
