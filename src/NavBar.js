import { NavLink } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import './NavBar.css';

const NavBar = ({ currUser }) => {
    return (
        currUser.username === '' ? (
            <ul className='navbar-ul'>
                <li className='navbar-item' key={uuid()}><NavLink to="/">Home</NavLink></li>
                <li className='navbar-item' key={uuid()}><NavLink to="/Jobs">Jobs</NavLink></li>
                <li className='navbar-item' key={uuid()}><NavLink to="/Companies">Companies</NavLink></li>
                <li className='navbar-item' key={uuid()}><NavLink to="/SignUp">Register</NavLink></li>
                <li className='navbar-item' key={uuid()}><NavLink to="/Login">Login</NavLink></li>

            </ul>
        ) : (
            <ul className='navbar-ul'>
                <li className='navbar-item' key={uuid()}><NavLink to="/">Home</NavLink></li>
                <li className='navbar-item' key={uuid()}><NavLink to="/Jobs">Jobs</NavLink></li>
                <li className='navbar-item' key={uuid()}><NavLink to="/Companies">Companies</NavLink></li>
                <li className='navbar-item ms-auto' key={uuid()}><NavLink to="/Profile">{currUser.username.charAt(0).toUpperCase() + currUser.username.slice(1)}</NavLink></li>
                <li className='navbar-item' key={uuid()}><NavLink to="/Logout">Logout</NavLink></li>
            </ul>
        )

    )
}


export default NavBar