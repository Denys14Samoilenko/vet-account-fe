import { IoIosArrowDropleft } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const ButtonBack = () => {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			className="btn btn__back btn__primary"
			onClick={() => navigate(-1)}
		>
			<IoIosArrowDropleft fontSize={20} />
		</button>
	);
};

export default ButtonBack;
