import { useEffect, useState } from 'react';
import { Pet } from '../../types/PetType';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Loader } from '../../components';

import './preview.scss';
import { fetchPets } from '../../api';

const Preview = () => {
	const [pets, setPets] = useState<Pet[]>([]);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (!token) {
			navigate('/');
			return;
		}

		const getPets = async () => {
			setIsLoading(true);
			try {
				const petsData = await fetchPets(token);
				setPets(petsData);
			} catch (error) {
				console.error('Помилка при отриманні тварин:', error);
			} finally {
				setIsLoading(false);
			}
		};

		getPets();
	}, [navigate]);

	return (
		<div className="preview">
			<h1>Оберіть улюбленця</h1>

			{isLoading ? (
				<Loader />
			) : (
				<Link className="btn btn__primary btn__add" to="/add-pet">
					Створити профіль улюбленця
				</Link>
			)}

			{!!pets.length && (
				<ul className="preview__list">
					{pets.map((pet) => (
						<li key={`${pet._id}-${pet.name}`} className="card-container">
							<Card pet={pet} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Preview;
