import { Bounce, toast } from 'react-toastify';

export const successToast = (message: string) => {
	toast.success(`${message}`, {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
		transition: Bounce,
	});
};

export const errorToast = (message: string) => {
	toast.error(`${message}`, {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
		transition: Bounce,
	});
};

export const warningToast = (message: string) => {
	toast.warning(`${message}`, {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
		transition: Bounce,
	});
};

export const getAgeMessage = (age: number): string => {
	const newAge = `${age}`;

	if (+newAge[newAge.length - 1] <= 4) {
		return 'роки';
	}

	return 'років';
};

export const getPhotoPath = (path: string) => {
	return path
		? `${process.env.REACT_APP_SERVER_PATH}/uploads/${path}`
		: '/images/card-photo.jpg';
};
