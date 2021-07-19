import { Paper } from '@material-ui/core';
import React from 'react';
import './Account.css';
import Avatarimg from '../../Media/Avatarimg.png';
import UserProfilePost from '../../components/userProfilePost/userProfilePost';


function Account(props) {
    return (
        <div className="account_main">
            <Paper className='account_paper' elevation={3}>
                <div className="account_wrapper">
                    <div className="accout_wrapper_left">
                        <img className="account_profile_img" src={Avatarimg} alt="profile img" />
                    </div>
                    <div className="accout_wrapper_right">
                        <h2>{props?.user?.name}</h2>
                        <small>{props.user?.email}</small><br />
                        <b>POINTS - <span>{props.user?.points}</span> </b>
                    </div>
                </div>
                <hr />
                <h3 className="my-posts">{props.posts?.posts?.filter((post) => {
                    return post.postedBy._id === props.user._id
                }).length === 0 ? "no posts" : "My posts"}</h3>
                <div className="account_posts">
                    {
                        props.posts?.posts?.filter((post) => {
                            return post.postedBy._id === props.user._id
                        }).map((post, index) => (

                            <UserProfilePost DeletePost={props.DeletePost} key={index} post={post} username={props.user.name} image={props.user?.image} />
                        ))
                    }
                </div>
            </Paper>
        </div>
    )
}

export default Account
