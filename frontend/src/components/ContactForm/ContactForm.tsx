import { Form, Formik } from 'formik';
import { SignUpSchema } from '../../utils/userShema';
import { CustomButton } from '../UI/CustomButton';
import { CustomInput } from '../UI/CustomInput';
import styles from './ContactForm.module.scss';

export const ContactForm = () => {
	return (
		<Formik
			initialValues={{
				firstName: '',
				lastName: '',
				email: '',
			}}
			onSubmit={(values, actions) => {
				console.log(values);
				actions.resetForm();
			}}
			validationSchema={SignUpSchema}
		>
			<Form className={styles.contactForm}>
				<CustomInput
					label='First Name'
					name='firstName'
					placeholder='Your name'
				/>
				<CustomInput
					label='Last Name'
					name='lastName'
					placeholder='Your last name'
				/>
				<CustomInput
					label='Email'
					name='email'
					placeholder='Your email address'
					type='email'
				/>
				<CustomButton type='submit' text='Submit'></CustomButton>
			</Form>
		</Formik>
	);
};
