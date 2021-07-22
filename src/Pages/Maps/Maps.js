import React, { useState, useEffect, useRef } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { format } from 'timeago.js';
import { useLocation } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Maps.css';


export default function Maps(props) {
    const inputRef = useRef();
    const location = useLocation();

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100vh",
        latitude: 17.41342,
        longitude: 17.41342,
        zoom: 8
    });
    const [foodItems, setfoodItems] = useState([])
    const [searchedvalue, setsearchedvalue] = useState("")
    const [currentState, setcurrentState] = useState(null)
    const [userCurrentlocation, setuserCurrentlocation] = useState({ latitude: 0, longitude: 0 });
    // console.log(userCurrentlocation)
    useEffect(async () => {

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
    useEffect(async () => {
        const foodList = [];
        props.data?.posts?.map((post) => {
            const postob = {};
            postob['lat'] = post.lat;
            postob['lon'] = post.lon;
            postob['id'] = post._id;
            postob['address'] = post.address;
            postob['description'] = post.description;
            postob['foods'] = [];
            post.fooditems.map((item) => {
                postob['foods'].push(item.item_name);
            })
            postob['foods'] = postob['foods'].toString();
            foodList.push(postob);


        })
        setfoodItems(foodList);

        if (location.state?.fromPost === true) {
            setViewport({
                ...viewport,
                latitude: location.state.lat,
                longitude: location.state.lon
            });

            setcurrentState(location.state.id)
        }
        else {
            await navigator.geolocation.getCurrentPosition(
                position => {
                    setViewport({
                        ...viewport,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                err => console.log(err)
            );
        }




    }, [props.data?.posts])
    const handleInputChange = () => {
        setsearchedvalue(inputRef.current.value)

    }
    const handleMarkerClick = (id, lat, lon) => {
        setcurrentState(id);
        setViewport({
            ...viewport,
            latitude: parseInt(lat),
            longitude: parseInt(lon),
        })
    }
    return (
        <div className="map">
            <div className="map-food-items">

                {
                    foodItems.filter((food) => food.foods.includes(searchedvalue)).length === 0 && <div style={{ textAlign: "center" }}>No Food items found</div>
                }
                {

                    foodItems.filter((food) => food.foods.includes(searchedvalue)).map((food, index) => {
                        return (<Paper key={index} data-aos="fade-right" className="map-food-item" elevation={4}>
                            <p><b>Address</b> : {food.address}</p>
                            <p><b>Foods</b> : {food.foods}</p>
                            <p><b>Description</b> : {food.description}</p>
                            <div>
                                <button className="map-dir-btn"><a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${food.address}`}>direction</a></button>
                                <button className="map-loc-btn" onClick={() => handleMarkerClick(food.id, food.lat, food.lon)}>location</button>
                            </div>
                        </Paper>)
                    })
                }
            </div>
            <div className="reactMapGl">
                <ReactMapGL
                    {...viewport}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxApiAccessToken="pk.eyJ1Ijoia2FtYW5kbGFiYWxhc2hla2hhciIsImEiOiJja3JiZXJ0MWg0YjdpMndueHlzOHFmMmJhIn0.GK_kdlg4xXcqcdSF8gmDow"
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    transitionDuration="400"

                >


                    <Marker latitude={parseInt(userCurrentlocation.latitude)} longitude={parseInt(userCurrentlocation.longitude)}
                        offsetLeft={-12} offsetTop={-5}>
                        <MyLocationIcon style={{
                            cursor: "pointer", font: viewport.zoom * 10,
                            color: "green"
                        }} />your are here
                    </Marker>



                    {

                        props.data?.posts?.map((post, i) => {
                            return (
                                <div key={i}>
                                    <Marker latitude={parseInt(post.lat)} longitude={parseInt(post.lon)} offsetLeft={-12} offsetTop={-5}>
                                        <RoomIcon onClick={() => handleMarkerClick(post._id, post.lat, post.lon)} style={{ cursor: "pointer", font: viewport.zoom * 10, color: props.id === post.postedBy?._id ? "blue" : "red" }} />
                                    </Marker>

                                    {post._id === currentState && <Popup
                                        latitude={parseInt(post.lat)}
                                        longitude={parseInt(post.lon)}
                                        closeButton={true}
                                        onClose={() => setcurrentState(null)}
                                        anchor="bottom" >
                                        <div style={{ zIndex: "200" }}>
                                            <span className="maptimeago">{format(post.createdAt)}</span>
                                            <div className="mapuser"><img src={post.postedBy.image} /><p>{post.postedBy.name}</p></div>

                                            <div style={{ fontSize: "12px", marginTop: "5px" }}><span style={{ color: "#FF00FF" }}>description :</span>  {post.description}</div>

                                            <div style={{ fontSize: "12px", marginTop: "5px" }}><span style={{ color: "#FF00FF" }}>Address :</span> : {post.address}</div>
                                            <TableContainer style={{ maxWidth: "350px" }}>
                                                <Table aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell size="small" align="center"><b>Items</b></TableCell>
                                                            <TableCell align="center"><b>quantity</b> </TableCell>
                                                            <TableCell align="center"><b>time</b></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>

                                                        {post.fooditems.map((row, index) => (
                                                            Date.parse(post?.updatedAt) / 1000 + parseInt(row.spoil_in_hrs) * 60 * 60 < (new Date().getTime() / 1000)
                                                                ? <TableRow key={index}>
                                                                    <TableCell align="center">{row.item_name}</TableCell>
                                                                    <TableCell align="center">{row.availability}kgs</TableCell>
                                                                    <TableCell align="center" style={{ color: "red" }}>spoiled {Math.floor(((new Date().getTime() / 1000) - (Date.parse(post?.updatedAt) / 1000 + parseInt(row.spoil_in_hrs) * 60 * 60)) / (60 * 60))}hrs ago</TableCell>
                                                                </TableRow>
                                                                :
                                                                <TableRow key={index}>
                                                                    <TableCell align="center">{row.item_name}</TableCell>
                                                                    <TableCell align="center">{row.availability}kgs</TableCell>

                                                                    <TableCell align="center"><span style={{ color: "green" }}>{row.spoil_in_hrs}hrs</span></TableCell>
                                                                </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <div></div>

                                        </div>
                                    </Popup>}


                                </div>
                            )
                        })
                    }


                    <input placeholder="search food items here..." ref={inputRef} onChange={handleInputChange} className="map_search" type="search" required />

                </ReactMapGL></div>
        </div>
    )
}
