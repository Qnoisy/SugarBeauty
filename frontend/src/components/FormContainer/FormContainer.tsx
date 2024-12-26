// FormContainer.tsx
import { Container } from 'components/Container';
import { Form, Formik } from 'formik';
import React from 'react';
import styles from './FormContainer.module.scss';

interface FormContainerProps {
	initialValues?: any;
	validationSchema?: any;
	onSubmit?: (values: any, actions: any) => void;
	title: string;
	children: React.ReactNode;
	isForm?: boolean; // Признак для использования в качестве формы
}

const FormContainer: React.FC<FormContainerProps> = ({
	initialValues,
	validationSchema,
	onSubmit,
	title,
	children,
	isForm = true, // По умолчанию компонент будет формой
}) => {
	// Если это форма, обернем контент в Formik и Form
	if (isForm && initialValues && validationSchema && onSubmit) {
		return (
			<Container section>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{({ handleSubmit }) => (
						<Form className={styles.form} onSubmit={handleSubmit}>
							<h2 className={styles.form__title}>
								<strong>{title}</strong>
							</h2>
							{children}
						</Form>
					)}
				</Formik>
			</Container>
		);
	}

	// Если это не форма, рендерим только контейнер с заголовком и содержимым
	return (
		<Container section>
			<div className={styles.form}>
				<h2 className={styles.form__title}>
					<strong>{title}</strong>
				</h2>
				<div className={styles.content}>{children}</div>
			</div>
		</Container>
	);
};

export default FormContainer;
