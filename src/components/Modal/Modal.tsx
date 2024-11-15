import { MdClose, MdOutlineCheck, MdOutlineWarningAmber } from 'react-icons/md';
import './modal.scss';
import { FC } from 'react';

type Props = {
	setIsModalOpen: (value: boolean) => void;
	confirmFunc: () => void;
};

const Modal: FC<Props> = ({ setIsModalOpen, confirmFunc }) => {
	return (
		<div className="modal">
			<div className="modal__content">
				<div className="modal__icon">
					<MdOutlineWarningAmber fontSize={30} />
				</div>
				<div className="modal__info">
					<h4 className="modal__title">Ви точно хочете видалити цю картку?</h4>
					<div className="modal__buttons">
						<button
							type="button"
							className="btn btn__primary"
							onClick={confirmFunc}
						>
							<MdOutlineCheck fontSize={20} />
						</button>
						<button
							type="button"
							className="btn btn__delete"
							onClick={() => setIsModalOpen(false)}
						>
							<MdClose fontSize={20} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
