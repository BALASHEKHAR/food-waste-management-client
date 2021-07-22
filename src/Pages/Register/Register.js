import React, { useState } from 'react'
import './Register.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
    Backdrop,
    CircularProgress,
} from '@material-ui/core';

export default function Register(props) {

    let history = useHistory();

    const [signInpanelOpened, setSignInpanelOpened] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [remail, setrEmail] = useState("");
    const [rpassword, setrPassword] = useState("");
    const [rname, setrName] = useState("");
    const [loading, setLoading] = useState(false)




    const openSignUpPanel = () => {
        setSignInpanelOpened("right-panel-active");
    }

    const openSignInPanel = () => {
        setSignInpanelOpened("");
    }

    const signInUser = async () => {
        setLoading(true);
        const Data = {
            password,
            email
        }
        props.LoginUser(Data, () => {
            props.LoadUser(() => {
                setLoading(false);
                console.log("user loaded");
            });
            props.LoadPosts(() => {
                setLoading(false);
                console.log("posts loaded")
            });
            history.replace('/');
        })



    }

    const signUpUser = async () => {
        const Data = {
            name: rname,
            email: remail,
            password: rpassword
        }
        props.signupUser(Data, () => {
            props.LoadUser(() => {
                console.log("user loaded");
            });
            props.LoadPosts(() => {
                console.log("posts loaded")
            });
            history.replace('/');
        })
    }

    return (
        <div className="register-wrapper">
            <div className="Register-container">
                <div className={`container ${signInpanelOpened}`}>
                    <div className="form-container sign-up-container">
                        <form onSubmit={(e) => { e.preventDefault(); signUpUser() }}>
                            <h1 className="create_account">Create Account</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input
                                value={rname}
                                onChange={(e) => setrName(e.target.value)}
                                type="text"
                                placeholder="Name" />
                            <input
                                value={remail}
                                onChange={(e) => setrEmail(e.target.value)}
                                type="email"
                                placeholder="Email" />
                            <input
                                value={rpassword}
                                onChange={(e) => setrPassword(e.target.value)}
                                type="password"
                                placeholder="Password" />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={(e) => { e.preventDefault(); signInUser() }}>
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your account</span>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email" />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password" />
                            <a href="#">Forgot your password?</a>
                            <button type="submit">Sign In</button>
                        </form>
                    </div>

                    {/* ignore just for animation pupose */}
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button onClick={openSignInPanel} className="ghost">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button onClick={openSignUpPanel} className="ghost">Sign Up</button>
                            </div>
                        </div>
                    </div>
                    {/* ignore just for animation pupose */}
                    <Backdrop
                        style={{ zIndex: "1600" }}
                        open={loading} >
                        <CircularProgress color="primary" />
                    </Backdrop>
                </div>
            </div>
        </div>
    )
}
