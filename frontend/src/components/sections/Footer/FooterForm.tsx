import { Formik, Form as FormikForm } from 'formik';
import { subscribeSchema } from '../../../utils/userShema';
import { CustomButton } from '../../UI/CustomButton';
import { CustomInput } from '../../UI/CustomInput';
import styles from './Footer.module.scss';

export const FooterForm = () => {
	return (
		<Formik
			initialValues={{
				email: '',
			}}
			onSubmit={(values, actions) => {
				console.log(values);
				actions.resetForm();
			}}
			validationSchema={subscribeSchema}
		>
			{() => (
				<FormikForm>
					<CustomInput
						name='email'
						placeholder='example@email.com'
						type='email'
						label='Subscribe to our newsletter'
					/>
					<CustomButton
						className={styles.footer__btn}
						type='submit'
						text={'Subscribe'}
					></CustomButton>
				</FormikForm>
			)}
		</Formik>
	);
};
