import { useAuth } from '../../lib/hooks';
import {
	MdOutlineHome,
	MdLogout,
	MdAddCircleOutline,
} from 'react-icons/md';

import './sidebar.scss';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
	const { logout } = useAuth();
	return (
		<aside className="aside">
			<nav className="nav">
				<div className="nav__item">
					<NavLink className="nav__link" to="/">
						<MdOutlineHome color="white" fontSize={20} />
					</NavLink>
					<NavLink className="nav__link" to="/add-pet">
						<MdAddCircleOutline color="white" fontSize={20} />
					</NavLink>
				</div>
				<div className="">
					<NavLink className="nav__link " to="/login" onClick={logout}>
						<MdLogout color="white" fontSize={20} />
					</NavLink>
				</div>
			</nav>
		</aside>
	);
};

export default Sidebar;
