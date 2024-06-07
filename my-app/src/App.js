import styles from './app.module.css';
import React, { useState, useRef } from 'react';

const sendFormData = (formData) => {
	console.log(formData);
};

const validateEmail = (email) => {
	const EMAIL_REGEXP =
		/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
	if (!EMAIL_REGEXP.test(email)) {
		return 'Введите корректный email адрес в формате example@mail.com';
	}
	return null;
};

const validatePassword = (password) => {
	if (!/(?=.*[A-Z])(?=.*\d)^[A-Za-z\d]{8,}$/.test(password)) {
		return 'Пароль должен состоять из латинских букв, содержать хотя бы одну заглавную букву и цифру и быть не меньше 8 символов';
	}
	return null;
};

const validatePasswordMatch = (password, passwordRepeat) => {
	if (password !== passwordRepeat) {
		return 'Пароли не совпадают';
	}
	return null;
};

export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		passwordRepeat: '',
	});

	const [error, setError] = useState(null); // сообщение об ошибке

	const onSubmit = (event) => {
		event.preventDefault();
		if (error) {
			return;
		}
		sendFormData(formData);
		setFormData({
			email: '',
			password: '',
			passwordRepeat: '',
		});
	};

	const { email, password, passwordRepeat } = formData;

	const validate = (name, value) => {
		let newError = null;

		switch (name) {
			case 'email':
				newError = validateEmail(value);
				break;
			case 'password':
				newError = validatePassword(value);
				break;
			case 'passwordRepeat':
				newError = validatePasswordMatch(password, value);
				break;
			default:
				break;
		}

		setError(newError);

		setFormData({
			...formData,
			[name]: value,
		});

		if (formData.email && formData.password && formData.passwordRepeat && !newError) {
			registerButtonRef.current.focus();
		}
	};

	const registerButtonRef = useRef(null);

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				{error && <div className={styles.errorLabel}>{error}</div>}
				<input
					name="email"
					type="email"
					placeholder="Почта"
					value={email}
					onChange={({ target }) =>
						setFormData({ ...formData, [target.name]: target.value })
					}
					onBlur={({ target }) => validate(target.name, target.value)}
				/>
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={({ target }) =>
						setFormData({ ...formData, [target.name]: target.value })
					}
					onBlur={({ target }) => validate(target.name, target.value)}
				/>
				<input
					name="passwordRepeat"
					type="password"
					placeholder="Повтор пароля"
					value={passwordRepeat}
					onChange={({ target }) =>
						setFormData({ ...formData, [target.name]: target.value })
					}
					onMouseLeave={({ target }) => validate(target.name, target.value)}
				/>
				<button ref={registerButtonRef} type="submit" disabled={error !== null}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
