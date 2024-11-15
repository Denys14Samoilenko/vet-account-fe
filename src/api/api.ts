import axios from 'axios';

export const fetchPet = async (id: string | undefined) => {
	const response = await axios.get(
		`${process.env.REACT_APP_SERVER_PATH}/pets/${id}`
	);

	return response.data;
};

export const fetchPets = async (token: string) => {
	const response = await axios.get(
		`${process.env.REACT_APP_SERVER_PATH}/pets`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return response.data;
};

export const deletePet = async (id: string) =>
	await axios.delete(`${process.env.REACT_APP_SERVER_PATH}/pets/${id}`);

export const editPet = async (
	petData: any,
	petID: string | undefined,
	token: string | null
) => {
	const response = await axios.patch(
		`${process.env.REACT_APP_SERVER_PATH}/pets/${petID}`,
		petData,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		}
	);

	return response.data;
};

export const addPet = async (petData: any, token: string | null) => {
	const response = await axios.post(
		`${process.env.REACT_APP_SERVER_PATH}/pets/add`,
		petData,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		}
	);
	return response.data;
};
