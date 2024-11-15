import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pet } from '../../types/PetType';
import { deletePet, fetchPet } from '../../api';
import { ButtonBack, Loader, Modal } from '../../components';
import {
	errorToast,
	getAgeMessage,
	getPhotoPath,
	successToast,
} from '../../lib/functions';
import { MdDeleteOutline, MdOutlineCreate } from 'react-icons/md';
import './pet-info.scss';

const PetInfo = () => {
	const { paramID } = useParams();

	const [pet, setPet] = useState<Pet | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const getPet = async () => {
			try {
				const petData = await fetchPet(paramID);
				setPet(petData);
			} catch (error) {
				console.error('Не вдалося знайти улюбленця:', error);
			}
		};

		getPet();
	}, [paramID]);

	if (!pet) {
		return <Loader />;
	}

	const { _id: id, name, type, breed, age, photo } = pet;

	const message = getAgeMessage(age);

	const deletePetCard = async () => {
		try {
			await deletePet(id);

			successToast('Вашу карту видалено!');
			navigate(-1);
		} catch (error) {
			errorToast('Не вдалося видалити картку!');
		}
	};

	const photoUrl = getPhotoPath(photo);

	return (
		<div className="petInfo">
			{isModalOpen && (
				<Modal setIsModalOpen={setIsModalOpen} confirmFunc={deletePetCard} />
			)}
			<div className="petInfo__header">
				<ButtonBack />
				<h1>{name}</h1>
			</div>

			<div className="petInfo__body">
				<div className="petInfo__content">
					<div className="petInfo__characteristics">
						<div className="petInfo__description">
							<h4 className="petInfo__title">Інформація про улюбленця</h4>
							<p>Вид: {type}</p>
							<p>Порода: {breed}</p>
							<p>
								Вік: {age} {message}
							</p>
						</div>

						<div className="petInfo__buttons">
							<button
								className="btn btn__primary"
								onClick={() => navigate(`/add-pet/${id}`)}
							>
								<MdOutlineCreate fontSize={20} />
							</button>
							<button
								type="button"
								className="btn btn__delete"
								onClick={() => setIsModalOpen(true)}
							>
								<MdDeleteOutline fontSize={20} />
							</button>
						</div>
					</div>

					<img className="petInfo__image" src={photoUrl} alt="" />
				</div>
			</div>
		</div>
	);
};

export default PetInfo;
