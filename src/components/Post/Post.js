import React from 'react'
import './Post.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Post(props) {

    return (
        <div className="post-container">
            <div className="post-container-details">
                <div>
                    <div className="posted_by_user">
                        <img src={props.post?.postedBy?.image} />
                        <h4>{props.post?.postedBy?.name}</h4>

                    </div>
                    <p>posted on - {props.post?.createdAt?.slice(0, 10)}</p>
                    <div className="post_availability">
                        <b>Description : </b>{props.post.description}
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
                                    {props.post.fooditems.map((row) => (
                                        <TableRow key={row.name}>
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
                    <div className="post_loc">
                        <b>Address : </b>{props.post.address}
                    </div>
                    <div className="post_remined">

                        <b>Other Details :</b>{props.post.any_other}
                    </div>




                </div>
                <div className="post_button">
                    <button className="req_now_btn">
                        Request</button>
                    <button className="req_now_btn">
                        show on map</button>
                    <button className="req_now_btn">
                        show directions</button>

                </div>
            </div>
            <div style={{ display: props.isProfile ? "none" : "block", width: props.isProfile ? "0%" : "50%" }} className="post-container-img">

                <img src={props.post.images[0]} />
            </div>
        </div>
    )
}

export default Post
