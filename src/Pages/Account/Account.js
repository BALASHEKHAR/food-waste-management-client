import { Paper, TextField, Snackbar } from '@material-ui/core';
import React, { useState } from 'react';
import './Account.css';
import Avatarimg from '../../Media/Avatarimg.png';
import Post from '../../components/Post/Post';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



function Account(props) {
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = useState(null);
    // const [email, setEmail] = useState("");
    const [nameError, setNameError] = useState(null);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackText, setSnackText] = useState("");
    const [valid, setValid] = useState(false);
    const [name, setName] = useState("");
    const [imgChange, setImageChange] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setImage(props.user?.image);
        setName(props.user?.name);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const uploadImageURL = (item) => {
        try {
            return URL.createObjectURL(item)
        } catch (error) {
            return item
        }
    }

    const updateProfile = () => {
        if (imgChange) {
            if (name.length < 2) {
                setNameError("enter Name");
                return
            }
            setSnackOpen(true);
            setSnackText("Posting...");
            const data = new FormData();
            data.append('file', image);
            data.append('upload_preset', "SocialMedia");
            data.append('cloud_name', "djqrcbjmu");

            fetch("	https://api.cloudinary.com/v1_1/djqrcbjmu/image/upload", {
                method: "post",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    const Data = {};
                    Data["name"] = name;
                    Data["image"] = data.secure_url;
                    props.updateProfile(Data, () => {
                        setSnackOpen(true);
                        setSnackText("Posted yayu");
                        setImage(null);
                        setName("");
                        setNameError(null);
                        setOpen(false);
                        setSnackOpen(false);
                    });
                })
        }
        else if (valid) {

            if (name.length < 2) {
                setNameError("enter Name");
                return
            }

            setSnackOpen(true);
            setSnackText("Posting...");
            const Data = {};
            Data["name"] = name;
            Data["image"] = image;
            props.updateProfile(Data, () => {
                setSnackOpen(true);
                setSnackText("Posted yayu");
                setImage(null);
                setName("");
                setOpen(false);
                setNameError(null);
                setSnackOpen(false);
            });
        } else {
            setOpen(false);
        }
    }


    return (
        <div className="account_main">
            <div className="account_wrapper">
                <div className="accout_wrapper_left">
                    <h2>PROFILE</h2>
                    <img className="account_profile_img" src={props.user?.image} alt="profile img" />
                </div>
                <div className="accout_wrapper_right">
                    <h3>{props.user?.email}<EditIcon onClick={() => handleClickOpen()} className="edit-icon" /></h3>
                    <p>{props?.user?.name} (<abbr className="upvotes" title="Up Votes">{props.posts?.posts?.filter((post) => {
                        return post.postedBy._id === props.user._id
                    }).reduce((c, d) => c += d.points.length, 0)}</abbr>)</p>

                </div>
            </div>
            <Paper className='account_paper' elevation={3}>

                <h3 className="my-posts">{props.posts?.posts?.filter((post) => {
                    return post.postedBy._id === props.user._id
                }).length === 0 ? "no posts" : "My posts"}</h3>
                <div className="account_posts">
                    {
                        props.posts?.posts?.filter((post) => {
                            return post.postedBy._id === props.user._id
                        }).map((post, index) => (
                            <Post
                                myPosts={true}
                                DeletePost={props.DeletePost}
                                currentUser={props.user}
                                key={index}
                                post={post}
                                username={props.user.name}
                                image={props.user?.image} />
                        ))
                    }
                </div>
                <Dialog
                    style={{ maxWidth: "500px", margin: "auto" }}
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <form onSubmit={(e) => { e.preventDefault(); updateProfile() }}>
                        <DialogTitle id="alert-dialog-slide-title">Edit Profile</DialogTitle>
                        <DialogContent style={{ padding: "0px" }} >
                            <div id="alert-dialog-slide-description">
                                <p style={{ opacity: "0.7", padding: "0px 10px" }}><b>NOTE: </b>High resolution image takes much to upload, please be patient</p><br />
                                <input style={{ width: "100%", margin: "auto", paddingLeft: "10px" }} type="file" onChange={(e) => { setImage(e.target.files[0]); setValid(true); setImageChange(true) }} /><br /><br />
                                <img width="100%" height="200px" style={{ textAlign: "center", padding: "10px", objectFit: "contain", cursor: "pointer" }} alt="img" src={uploadImageURL(image)} />
                                <br /><br />
                                <TextField
                                    style={{ padding: "0px 10px" }}
                                    size="small"
                                    required
                                    error={nameError !== null}
                                    helperText={nameError}
                                    label="Name"
                                    fullWidth
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); setValid(true) }}
                                />

                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button type="button" onClick={handleClose} color="primary">
                                cancel
                            </Button>
                            <Button type="submit" onClick={handleClose} color="primary">
                                Update
                            </Button>
                        </DialogActions>

                    </form>
                </Dialog>
            </Paper>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackOpen}
                autoHideDuration={3000}
                onClose={() => setSnackOpen(false)}
                message={snackText}
            />
        </div>
    )
}

export default Account
