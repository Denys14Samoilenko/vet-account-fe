import './main-page.scss';
import { Link } from 'react-router-dom';

const MainPage = () => {
	return (
		<div className="auth">
			<div className="auth__container">
				<h1 className='auth__title'>Структуруй справи!</h1>
				<div className="auth__buttons">
					<Link to="/register" className="btn btn__primary">
						Реєстрація
					</Link>
					<Link to="/login" className="btn btn__primary">
						Логін
					</Link>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
