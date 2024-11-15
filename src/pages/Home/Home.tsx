import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import './home.scss';
import { Sidebar } from '../../components';

type User = {
	username: string;
	email: string;
};

const Home = () => {
	const [user, setUser] = useState<User | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUSerInfo = async () => {
			const token = localStorage.getItem('token');
			
			if (!token) {
				navigate('/');
				return;
			}

			try {
				const response = await axios.get(
					`${process.env.REACT_APP_SERVER_PATH}/user/user-info`,
					{
						headers: {
							'x-auth-token': token,
						},
					}
				);

				setUser(response.data);
			} catch (error) {
				navigate('/');
			}
		};

		fetchUSerInfo();
	}, [navigate]);

	if (!user) {
		return null;
	}

	return (
		<div className="home">
			<Sidebar />

			<div className="oulet">
				<Outlet />
			</div>
		</div>
	);
};

export default Home;
