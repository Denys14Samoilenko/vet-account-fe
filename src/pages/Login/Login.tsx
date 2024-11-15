import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../lib/functions';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { LOGIN_MESSAGE, REQUIRE_MESSAGE } from '../../lib/variables';
import { useAuth } from '../../lib/hooks';
import { ButtonBack } from '../../components';


const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const navigate = useNavigate();

	const { login } = useAuth();


	const onSubmit: SubmitHandler<FieldValues> = async ({
		username,
		password,
	}) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_SERVER_PATH}/auth/login`,
				{
					username,
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const token = response.data.token;

			login(token);
			navigate('/');

			successToast(`Вітаємо, ${username}!`);
		} catch (error: any) {
			const errorMessage = error.response?.data?.message || LOGIN_MESSAGE;
			errorToast(errorMessage);
		}
	};

	return (
		<div className="auth">
			<div className="auth__container">
				<div className="auth__header">
					<ButtonBack />
					<h2 className="auth__title">Логін</h2>
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
						Login
					</button>
				</form>
				<p className="">
					Немає аккаунту? <Link to="/register">Зареєструватися</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
