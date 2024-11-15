import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './lib/hooks';
import {
	AddPet,
	Home,
	Login,
	MainPage,
	PetInfo,
	Preview,
	Register,
} from './pages';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { jwtDecode } from 'jwt-decode';
import { warningToast } from './lib/functions';

const App = () => {
	const { token, logout } = useAuth();

	useEffect(() => {
		if (token) {
			const decoded: any = jwtDecode(token);
			const isExpired = Date.now() >= decoded.exp * 1000;

			if (isExpired) {
				warningToast('Треба перезайти для безпеки аккаунту!');
				logout();
				<Navigate to="/login" />;
			}
		}
	}, [token, logout]);

	return (
		<>
			<ToastContainer />
			<Routes>
				{token ? (
					<>
						<Route
							path="/"
							element={token ? <Home /> : <Navigate to="/login" />}
						>
							<Route index element={<Preview />} />
							<Route path="add-pet/:petID?" element={<AddPet />} />
							<Route path=":paramID" element={<PetInfo />} />
						</Route>
						<Route path="*" element="exit" />
					</>
				) : (
					<>
						<Route path="/" element={<MainPage />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
					</>
				)}
			</Routes>
		</>
	);
};

export default App;
