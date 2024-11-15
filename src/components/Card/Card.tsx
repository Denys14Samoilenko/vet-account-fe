import { Link } from 'react-router-dom';
import './card.scss';
import { FC } from 'react';
import { Pet } from '../../types/PetType';
import { getAgeMessage, getPhotoPath } from '../../lib/functions';

type Props = {
	pet: Pet;
};

const Card: FC<Props> = ({ pet }) => {
	const { _id: id, name, type, breed, age, photo } = pet;

	const photoUrl = getPhotoPath(photo);
	
	const message = getAgeMessage(age);

	return (
		<Link to={`/${id}`} className="card">
			<img src={photoUrl} className="card__img" alt="" />
			<div className="card__body">
				<h4 className="card__title">Ім'я: {name}</h4>
				<p className="card__description">Вид: {type}</p>
				<p className="card__description">Порода: {breed}</p>
				<p className="card__description">
					Вік: {age} {message}
				</p>
			</div>
		</Link>
	);
};

export default Card;
