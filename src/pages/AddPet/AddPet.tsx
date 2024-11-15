import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from 'react-hook-form';
import Select from 'react-select';
import { errorToast, successToast } from '../../lib/functions';
import { useNavigate, useParams } from 'react-router-dom';
import { REQUIRE_MESSAGE } from '../../lib/variables';
import { useEffect, useState } from 'react';

import './add-pet.scss';
import { addPet, editPet, fetchPet } from '../../api';

const options = [
	{ value: 'Собака', label: 'Собака' },
	{ value: 'Кіт', label: 'Кіт' },
	{ value: 'Птах', label: 'Птах' },
	{ value: 'Рептилія', label: 'Рептилія' },
	{ value: 'Рибки', label: 'Рибки' },
	{ value: 'Інше', label: 'Інше' },
];

const AddPet = () => {
	const {
		register,
		handleSubmit,
		reset,
		control,
		setValue,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [photoName, setPhotoName] = useState('');

	const navigate = useNavigate();
	const { petID } = useParams();

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setPhotoName(file.name);
		}
	};

	useEffect(() => {
		const loadPetData = async () => {
			if (petID) {
				setIsEditing(true);
				try {
					const petData = await fetchPet(petID);
					setValue('name', petData.name);
					setValue('type', petData.type);
					setValue('breed', petData.breed);
					setValue('age', petData.age);
				} catch (error) {
					errorToast('Помилка при завантаженні даних!');
				}
			}
		};

		loadPetData();
	}, [petID, setValue]);

	const onSubmit: SubmitHandler<FieldValues> = async ({
		name,
		type,
		breed,
		age,
		photo,
	}) => {
		setIsSubmitting(true);
		const token = localStorage.getItem('token');

		const petData = { name, type, breed, age, photo: photo?.[0] };

		try {
			if (isEditing) {
				await editPet(petData, petID, token);

				successToast('Картка улюбленця оновлена успішно!');
			} else {
				await addPet(petData, token);

				successToast('Картка улюбленця створена успішно!');
			}
			navigate(-1);
		} catch {
			errorToast('Помилка, при обробці запиту!');
		} finally {
			setIsSubmitting(false);
			reset();
		}
	};

	return (
		<div className="add-pet">
			<h2>
				{isEditing ? 'Редагування картки' : 'Додай картку свого хвостика'}
			</h2>
			<form className="form form__add" onSubmit={handleSubmit(onSubmit)}>
				<label className="label">
					<input
						className="input"
						type="text"
						placeholder="Введіть ім'я"
						minLength={1}
						maxLength={30}
						{...register('name', { required: !isEditing && REQUIRE_MESSAGE })}
					/>
					{errors.name && (
						<span className="input__error">
							{errors.name.message as string}
						</span>
					)}
				</label>
				<label className="label">
					<Controller
						name="type"
						control={control}
						rules={{ required: !isEditing && REQUIRE_MESSAGE }}
						render={({ field: { onChange, value, ref } }) => (
							<Select
								ref={ref}
								options={options}
								value={options.find((option) => option.value === value) || null}
								onChange={(selectedOption) => {
									onChange(selectedOption ? selectedOption.value : null);
								}}
								placeholder="Оберіть вид улюбленця"
							/>
						)}
					/>
					{errors.type && (
						<span className="input__error">
							{errors.type.message as string}
						</span>
					)}
				</label>
				<label className="label">
					<input
						className="input"
						type="text"
						placeholder="Введіть породу"
						minLength={1}
						maxLength={30}
						{...register('breed', { required: !isEditing && REQUIRE_MESSAGE })}
					/>
					{errors.breed && (
						<span className="input__error">
							{errors.breed.message as string}
						</span>
					)}
				</label>
				<label className="label">
					<input
						className="input"
						type="number"
						placeholder="Введіть повний вік у роках"
						min={0}
						max={50}
						{...register('age', { required: !isEditing && REQUIRE_MESSAGE })}
					/>
					{errors.age && (
						<span className="input__error">{errors.age.message as string}</span>
					)}
				</label>
				<label className="label label__add">
					Прикріпити фото
					<input
						className="input input__file"
						type="file"
						accept="image/*"
						{...register('photo')}
						onChange={handleFileChange}
					/>
					<span className="photo-name">{photoName}</span>
				</label>
				<button
					type="submit"
					className="btn btn__primary"
					disabled={isSubmitting}
				>
					{isSubmitting
						? 'Завантаження...'
						: isEditing
						? 'Зберегти зміни'
						: 'Додати'}
				</button>
			</form>
		</div>
	);
};

export default AddPet;
