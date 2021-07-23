import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';
import { HashRouter, Switch, Route } from 'react-router-dom'
import Register from './Register/Register';
import Dashboard from './Dashboard/Dashboard';
import Account from './Account/Account';
import Auth from '../auth';
import Donate from './Donate/Donate';
import Maps from './Maps/Maps'
import { LoadUser, LogoutUser, LoginUser, signupUser, updateProfile } from '../redux/actions/userAction';
import { CreatePosts, LoadPosts, DeletePost, UpdatePost, upVote } from '../redux/actions/postsAction';
import { connect } from 'react-redux';
import {
    Backdrop,
    CircularProgress,
} from '@material-ui/core';



function Main(props) {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        props.LoadUser(() => {
            setLoading(false);
        });
        props.LoadPosts(() => {
            setLoading(false);
        });
    }, [])
    return (

        <div>
            <HashRouter>
                <Switch>

                    <Route path="/" exact>
                        <Header LogoutUser={() => props.LogoutUser()} />
                        <Home />
                    </Route>

                    <Route path="/login" exact>
                        <Auth data={props.user} login={true}>
                            <Register
                                LoginUser={(data, onSuccess) => props.LoginUser(data, onSuccess)}
                                signupUser={(data, onSuccess) => props.signupUser(data, onSuccess)}
                                LoadUser={props.LoadUser}
                                LoadPosts={props.LoadPosts} />
                        </Auth>
                    </Route>

                    <Route path="/dashboard" exact>
                        <Header LogoutUser={() => props.LogoutUser()} />
                        <Dashboard
                            currentUser={props.user}
                            upVote={(postid, currentUserId) => props.upVote(postid, currentUserId)}
                            posts={props.posts}
                            user={props.user} />
                    </Route>
                    <Route path="/account" exact>
                        <Auth data={props.user}>
                            <Header LogoutUser={() => props.LogoutUser()} />
                            <Account
                                updateProfile={props.updateProfile}
                                DeletePost={props.DeletePost}
                                posts={props.posts}
                                user={props.user?.user} />
                        </Auth>
                    </Route>

                    <Route path="/donate" exact>
                        <Auth data={props.user}>
                            <Header LogoutUser={() => props.LogoutUser()} />
                            <Donate UpdatePost={props.UpdatePost} CreatePosts={props.CreatePosts} id={props.user?.user?._id} />
                        </Auth>
                    </Route>

                    <Route path="/map" exact>
                        <Auth data={props.user}>
                            <Maps data={props.posts} id={props.user?.user?._id} />
                        </Auth>
                    </Route>

                </Switch>
                <Backdrop
                    style={{ zIndex: "1600" }}
                    open={loading} >
                    <CircularProgress color="primary" />
                </Backdrop>
            </HashRouter>

        </div>

    )
}

const mapStateToProps = (state) => {

    return {
        user: state.user,
        posts: state.posts,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (data, onSuccess) => dispatch(updateProfile(data, onSuccess)),
        LoadUser: (onSuccess) => dispatch(LoadUser(onSuccess)),
        LoadPosts: (onSuccess) => dispatch(LoadPosts(onSuccess)),
        DeletePost: (id) => dispatch(DeletePost(id)),
        LoginUser: (data, onSuccess) => dispatch(LoginUser(data, onSuccess)),
        signupUser: (data, onSuccess) => dispatch(signupUser(data, onSuccess)),
        LogoutUser: () => dispatch(LogoutUser()),
        upVote: (postid, currentUserId) => dispatch(upVote(postid, currentUserId)),
        UpdatePost: (id, pi, images, data, eraserData) => dispatch(UpdatePost(id, pi, images, data, eraserData)),
        CreatePosts: (images, data, eraserData) => dispatch(CreatePosts(images, data, eraserData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)