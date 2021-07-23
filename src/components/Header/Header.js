import React, { useState } from 'react';
import logo from '../../Media/logo.png';
import './Header.css';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Header(props) {

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen = () => {
        setOpen1(true);
        if (!localStorage.getItem("token")) {
            history.replace('/login');
        }
    };

    const handleClose = () => {
        setOpen1(false);
    };


    const openRegister = () => {

        localStorage.removeItem("token");
        props.LogoutUser();
        history.push("/login");
    }

    const openDashboard = () => {
        setOpen(!open)
        history.push("dashboard");
    }
    const openMap = () => {
        history.push("map");
    }
    const openAccount = () => {
        setOpen(!open)
        history.push("account");
    }
    const openHome = () => {
        setOpen(!open)
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
                {
                    localStorage.getItem("token") &&
                    <a onClick={openAccount}>
                        <p>Account</p>
                    </a>
                }

                <a onClick={openMap}>
                    <p>Maps</p>
                </a>
                <>
                    <button onClick={handleClickOpen} className={open ? "mob_sign_in_button" : "des_sign_in_button"}>
                        {localStorage.getItem("token") ? "Log out" : "Sign up"}
                    </button>
                </>
            </div>
            <div className="header_bottom">
                <button onClick={handleClickOpen} className="sign_in_button">
                    {localStorage.getItem("token") ? "Log out" : "Sign up"}
                </button>
                <i onClick={() => setOpen(!open)} className={!open ? "fa fa-bars" : "fa fa-bars open"}></i>
            </div>
            <Dialog
                open={open1}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"><b>Food Waste Management</b></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to logout form this website??
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        cancel
                    </Button>
                    <Button onClick={openRegister} color="primary" autoFocus>
                        logout
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Header
