import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './Register/Register';
import Dashboard from './Dashboard/Dashboard';
import Account from './Account/Account';
import Auth from '../auth';
import Donate from './Donate/Donate';
import { LoadUser } from '../redux/actions/userAction';
import { CreatePosts, LoadPosts, DeletePost, UpdatePost } from '../redux/actions/postsAction';
import { connect } from 'react-redux';


function Main(props) {


    useEffect(() => {

        props.LoadUser();
        props.LoadPosts();
    }, [])
    return (

        <div>
            <BrowserRouter>

                <Switch>

                    <Route path="/" exact>
                        <Header />
                        <Home />
                    </Route>

                    <Route path="/login" exact>
                        <Auth data={props.user} login={true}>
                            <Register LoadUser={props.LoadUser} LoadPosts={props.LoadPosts} />
                        </Auth>
                    </Route>

                    <Route path="/dashboard" exact>
                        <Header />
                        <Dashboard posts={props.posts} user={props.user} />
                    </Route>
                    <Route path="/account" exact>
                        <Auth data={props.user}>
                            <Header />
                            <Account DeletePost={props.DeletePost} posts={props.posts} user={props.user?.user} />
                        </Auth>
                    </Route>

                    <Route path="/donate" exact>
                        <Auth data={props.user}>
                            <Header />
                            <Donate UpdatePost={props.UpdatePost} CreatePosts={props.CreatePosts} id={props.user?.user?._id} />
                        </Auth>
                    </Route>

                </Switch>

            </BrowserRouter>

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
        LoadUser: () => dispatch(LoadUser()),
        LoadPosts: () => dispatch(LoadPosts()),
        DeletePost: (id) => dispatch(DeletePost(id)),
        UpdatePost: (id, pi, images, data, eraserData) => dispatch(UpdatePost(id, pi, images, data, eraserData)),
        CreatePosts: (images, data, eraserData) => dispatch(CreatePosts(images, data, eraserData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)