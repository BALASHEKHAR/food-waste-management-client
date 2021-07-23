import React, { useEffect } from 'react';
import './Dashboard.css';
import { useHistory } from 'react-router-dom'
import Post from '../../components/Post/Post';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MyLocationIcon from '@material-ui/icons/MyLocation';

function Dashboard(props) {
    const history = useHistory();
    const anchorRef = React.useRef();
    const openDonate = () => {
        history.push('donate');

    }
    const [open, setOpen] = React.useState(false);
    const [sortbyloc, setsortbyloc] = React.useState(false);
    const [inputval, setinputval] = React.useState("");
    const [filter, setfilter] = React.useState("Food")
    const [userCurrentlocation, setuserCurrentlocation] = React.useState({ latitude: 0, longitude: 0 });



    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current?.contains(event?.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    React.useEffect(async () => {

        await navigator.geolocation.getCurrentPosition(
            position => {
                setuserCurrentlocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            err => console.log(err)
        );

    }, [])
    const setCurrentFilter = (e, fil) => {
        setfilter(fil);
        handleClose(e);
    }


    return (
        <div>

            {
                props.posts?.posts?.length === 0 ? <div style={{ marginTop: "20px", textAlign: "center" }}>No Posts found</div> :
                    <div className="dashboard">

                        <div className="dashboard_search_location">
                            <div className="dashboard_search">
                                <input

                                    value={inputval}
                                    onChange={(e) => setinputval(e.target.value)} placeholder={`search for ${filter}`} type="search" required />
                                <img ref={anchorRef}
                                    onClick={handleToggle}
                                    className="filterIcon"
                                    src="https://cdn.icon-icons.com/icons2/2368/PNG/512/filter_icon_143777.png" alt="filter" />
                            </div>

                            <div className="dashboard_location">
                                <button onClick={() => setsortbyloc(!sortbyloc)}>{!sortbyloc ? <>Sort by loc<MyLocationIcon style={{ marginLeft: "5px" }} /></> : <>Sort by time<ScheduleIcon style={{ marginLeft: "5px" }} /></>}</button>
                            </div>

                        </div>

                        <div className="dashboard_posts">

                            {
                                props.posts?.posts?.sort((a, b) => {
                                    if (sortbyloc) {
                                        const x1 = parseInt(a.lat), y1 = parseInt(a.lon);
                                        const x2 = parseInt(b.lat), y2 = parseInt(b.lon);
                                        const x3 = userCurrentlocation.latitude, y3 = userCurrentlocation.longitude;

                                        const d1 = Math.sqrt((x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3));
                                        const d2 = Math.sqrt((x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3));

                                        return d1 - d2;
                                    }
                                    else {
                                        return Date.parse(a.updatedAt) < Date.parse(b.updatedAt);
                                    }
                                })

                                    .filter((post, index) => {
                                        if (filter === "Food") {
                                            const allitems = [];
                                            post.fooditems.map((item) => allitems.push(item.item_name));

                                            return allitems.toString().includes(inputval);
                                        }
                                        else if (filter === "Country") {
                                            return (post.country.includes(inputval))
                                        }
                                        else {
                                            return (post.postedBy.name.includes(inputval))

                                        }
                                    }).map((post, index) => (
                                        <Post
                                            currentUser={props.currentUser?.user}
                                            upVote={(postid, currentUserId) => props.upVote(postid, currentUserId)}
                                            key={index}
                                            post={post} />
                                    ))
                            }
                        </div>
                    </div>
            }
            <div data-aos="zoom-in-down" data-aos-delay="5000" className="float_donate" onClick={openDonate}>
                <button>Donate</button>
            </div>

            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={(e) => setCurrentFilter(e, "Food")}>Food Items</MenuItem>
                                    <MenuItem onClick={(e) => setCurrentFilter(e, "Country")}>Country</MenuItem>
                                    <MenuItem onClick={(e) => setCurrentFilter(e, "User")}>User</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

        </div>

    )
}

export default Dashboard
