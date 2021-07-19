import React, { useState } from 'react';
import logo from '../../Media/logo.png';
import './Header.css';
import { Link, useHistory } from 'react-router-dom'

function Header() {

    const history = useHistory();
    const [open, setOpen] = useState(false)

    const openRegister = () => {
        localStorage.removeItem("token");
        history.push("/login");
    }

    const openDashboard = () => {
        history.push("dashboard");
    }
    const openAccount = () => {
        history.push("account");
    }
    const openHome = () => {

        history.push("/");
    }

    return (
        <div className="header_main">
            <div className="header_top">
                <img className="logo" src={logo} alt="logo" />
                <Link style={{ textDecoration: "none" }} to="/">
                    <h2>Food Waste</h2>
                </Link>
            </div>
            <div className={open ? "header_middle_open" : "header_middle"}>
                <a onClick={openHome}>
                    <p>Home</p>
                </a>
                <a onClick={openDashboard}>
                    <p>Dashboard</p>
                </a>
                <a onClick={openAccount}>
                    <p>Account</p>
                </a>
                <a href='/#about_us'>
                    <p>About</p>
                </a>
                <a href='/#help'>
                    <p>Help</p>
                </a>
                <>
                    <button onClick={openRegister} className={open ? "mob_sign_in_button" : "des_sign_in_button"}>
                        Log out
                    </button>
                </>
            </div>
            <div className="header_bottom">
                <button onClick={openRegister} className="sign_in_button">
                    Log out
                </button>
                <i onClick={() => setOpen(!open)} className={!open ? "fa fa-bars" : "fa fa-bars open"}></i>
            </div>
        </div>
    )
}

export default Header
