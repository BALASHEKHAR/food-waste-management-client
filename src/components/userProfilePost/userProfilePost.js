import React from 'react'
import { useHistory } from 'react-router-dom'
import './userProfilePost.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function UserProfilePost(props) {
    const history = useHistory();
    console.log(props.post)
    const editPost = () => {
        history.push('/donate', props.post);
    }

    const deletePost = () => {

        props.DeletePost(props?.post?._id);
    }
    return (
        <div className="upost-container-details">
            <Paper style={{ padding: "10px" }} elevation={4}>
                <div>

                    <div className="upost_availability">
                        <b>Description : </b>{props.post?.description}
                        <p>posted on - {props.post?.createdAt?.toString().slice(0, 10)}</p>
                    </div>
                    {/* tabel */}

                    <div>
                        <br />
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><b>Food Item</b></TableCell>
                                        <TableCell align="center"><b>Availability</b> </TableCell>
                                        <TableCell align="center"><b>Spoils_in_hrs</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.post.fooditems.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{row.availability}</TableCell>
                                            <TableCell align="center">{row.item_name}</TableCell>
                                            <TableCell align="center">{row.spoil_in_hrs}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br />
                    </div>
                    {/* table */}
                    {/* <div className="post-items">
                        <ul>
                            <li>item1 <span>1kg</span></li>
                            <li>item1<span> 1kg</span></li>
                            <li>item1<span> 1kg</span></li>
                            <li>item1 <span>1kg</span></li>
                        </ul>
                    </div> */}
                    <div className="upost_loc">
                        <b>Address : </b>{props.post.address}
                    </div>
                    <div className="upost_remined">

                        <b>Other Details :</b>{props.post.any_other}
                    </div>




                </div>
                <div className="upost_button">
                    <button onClick={editPost} className="ureq_now_btn">
                        Edit</button>
                    <button onClick={deletePost} className="ureq_now_btn">
                        Delete</button>

                </div>
            </Paper>
        </div>
    )
}

export default UserProfilePost
