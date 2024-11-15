import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { errorToast, successToast } from '../../lib/functions';
import { EXIST_MESSAGE, REQUIRE_MESSAGE } from '../../lib/variables';
import { ButtonBack } from '../../components';

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		reset,
	} = useForm({ mode: 'onBlur' });

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<FieldValues> = async ({
		username,
		email,
		password,
	}) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_SERVER_PATH}/auth/register`,
				{
					username,
					email,
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.data.message === 'Username is already exists') {
				setError('username', {
					type: 'manual',
					message: EXIST_MESSAGE,
				});
				return;
			}

			if (response.data.message === 'Email is already exists') {
				setError('email', {
					type: 'manual',
					message: EXIST_MESSAGE,
				});
				return;
			}

			navigate('/login');
			successToast('Реєстрація успішна!');

			reset();
		} catch (error: any) {
			const errorMessage = error.responce?.data?.message || EXIST_MESSAGE;

			errorToast(errorMessage);
		}
	};

	return (
		<div className="auth">
			<div className="auth__container">
				<div className="auth__header">
					<ButtonBack/>
					<h2 className="auth__title">Реєстрація</h2>
				</div>

				<form className="form" onSubmit={handleSubmit(onSubmit)}>
					<label className="label">
						<input
							className="input"
							type="text"
							placeholder="Ім'я"
							autoComplete="off"
							{...register('username', { required: REQUIRE_MESSAGE })}
						/>
						{errors.username && (
							<span className="input__error">
								{errors.username.message as string}
							</span>
						)}
					</label>
					<label className="label">
						<input
							className="input"
							type="email"
							placeholder="Пошта"
							autoComplete="off"
							{...register('email', { required: REQUIRE_MESSAGE })}
						/>
						{errors.email && (
							<span className="input__error">
								{errors.email.message as string}
							</span>
						)}
					</label>
					<label className="label">
						<input
							className="input"
							type="password"
							placeholder="Пароль"
							autoComplete="off"
							{...register('password', { required: REQUIRE_MESSAGE })}
						/>
						{errors.password && (
							<span className="input__error">
								{errors.password.message as string}
							</span>
						)}
					</label>
					<button type="submit" className="btn btn__primary">
						Register
					</button>
				</form>
				<p className="">
					Вже є аккаунт? <Link to="/login">Увійти</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
