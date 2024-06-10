import styles from './app.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const sendFormData = (formData) => {
	console.log(formData);
};
const schema = yup.object({
	email: yup
		.string()
		.email('Введите корректный email адрес в формате example@mail.com')
		.required('Поле email обязательно для заполнения'),
	password: yup
		.string()
		.matches(
			/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
			'Пароль должен состоять из латинских букв, содержать хотя бы одну заглавную букву и цифру и быть не меньше 8 символов',
		),
	passwordRepeat: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passwordRepeat: '',
		},
		resolver: yupResolver(schema),
	});
	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(sendFormData)}>
				{errors?.email?.message && (
					<div className={styles.errorLabel}>{errors?.email?.message}</div>
				)}
				<input
					name="email"
					type="email"
					placeholder="Почта"
					{...register('email')}
				/>
				{errors?.password?.message && (
					<div className={styles.errorLabel}>{errors?.password?.message}</div>
				)}
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					{...register('password')}
				/>
				{errors?.passwordRepeat?.message && (
					<div className={styles.errorLabel}>
						{errors?.passwordRepeat?.message}
					</div>
				)}
				<input
					name="passwordRepeat"
					type="password"
					placeholder="Повтор пароля"
					{...register('passwordRepeat')}
				/>
				<button type="submit">Зарегистрироваться</button>
			</form>
		</div>
	);
};
