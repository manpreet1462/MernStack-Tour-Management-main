import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './header.css'
import { AuthContext } from '../../context/AuthContext.js'
const nav__links = [
    {
        path: '/home',
        display: 'Home',
    },
    {
        path: '/about ',
        display: 'About',
    },
    {
        path: '/tours',
        display: 'Tours',
    },
];

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/');
    }

    const stickyHeaderFunc = () => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            headerRef.current.classList.add('sticky__header');
        } else {
            headerRef.current.classList.remove('sticky__header');
        }
    };

    useEffect(() => {
        // Attach the scroll event listener
        window.addEventListener('scroll', stickyHeaderFunc);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', stickyHeaderFunc);
        };
    }, []); // Empty dependency array ensures this runs only once
    const toggleMenu = () => {
        menuRef.current.classList.toggle('show__menu')
    }
    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper d-flex align-items-center justify-content-between">
                        {/* Logo */}
                        <div className="logo">
                            <img src={logo} alt="Logo" />
                        </div>
                        {/* Logo end */}

                        {/* Menu start */}
                        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                            <ul className="menu d-flex align-items-center gap-5">
                                {nav__links.map((item, index) => (
                                    <li className="nav__item" key={index}>
                                        <NavLink
                                            to={item.path}
                                            className={navClass => navClass.isActive ? 'active__link' : ''}
                                        >
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Menu end */}

                        <div className="nav__right d-flex align-items-center gap-4">
                            <div className="nav__btns d-flex align-items-center gap-4">
                                {user ? <>
                                    <h5 className='mb-0'>{user.username}</h5>
                                    <button className='btn btn-dark' onClick={logout}>Logout</button>
                                </> : <>
                                    <Link className="btn secondary__btn" to="/login">
                                        Login
                                    </Link>
                                    <Link className="btn primary__btn" to="/register">
                                        Register
                                    </Link>
                                </>}

                            </div>
                            <span className="mobile__menu" onClick={toggleMenu}>
                                <i className="ri-menu-line"></i>
                            </span>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
