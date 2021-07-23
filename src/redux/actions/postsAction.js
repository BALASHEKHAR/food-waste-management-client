import {
    CREATE_POST,
    LOAD_POSTS,
    UPDATE_POST,
    DELETE_POST,
    ERROR,
    UP_VOTE
} from '../actionTypes';
import axios from 'axios'

export const LoadPosts = (onSuccess) => {
    return async (dispatch, getState) => {
        try {
            const posts = await axios.get('https://food-waste-management.herokuapp.com/api/post/allposts');
            dispatch({ type: LOAD_POSTS, payload: posts.data });
            onSuccess();
        } catch (err) {
            dispatch({ type: ERROR, payload: err.response })
        }
    }
}

export const CreatePosts = (images, sdata, eraserData) => {
    return async (dispatch, getState) => {

        try {
            const imgUrls = [];
            images.map(async (image) => {
                const data = new FormData();
                data.append('file', image);
                data.append('upload_preset', "SocialMedia");
                data.append('cloud_name', "djqrcbjmu");
                const data1 = await fetch("	https://api.cloudinary.com/v1_1/djqrcbjmu/image/upload", {
                    method: "post",
                    body: data
                });
                const data2 = await data1.json();
                const url = await data2.secure_url;
                imgUrls.push(url);
                if (imgUrls.length === images.length) {

                    sdata['images'] = imgUrls;

                    const fulladdress = sdata['country'] + ',' + sdata['city'] + ',' + sdata['address'];
                    const getLatLangFromAddress = await axios.get(`https://www.mapquestapi.com/geocoding/v1/address?key=iIzTGMTjj6hWGGvsPSShyeDxyifWFnpL&location=${fulladdress}`);
                    const latLng = getLatLangFromAddress.data.results[0].locations[0].latLng;
                    const lat = latLng.lat.toString();
                    const lng = latLng.lng.toString();

                    sdata['lat'] = lat;
                    sdata['lon'] = lng;

                    const upload = await axios.post('https://food-waste-management.herokuapp.com/api/post/addpost', sdata, {
                        headers: {
                            'authentication': localStorage.getItem('token')
                        }
                    });

                    dispatch({ type: CREATE_POST, payload: upload.data })

                    eraserData();


                }

            });

        } catch (err) {
            console.log(err.message);
            eraserData();

        }
    }
}

export const UpdatePost = (id, pi, images, sdata, eraserData) => {
    return async (dispatch, getState) => {

        try {

            const imgUrls = [];


            images.map(async (image) => {
                if (typeof image === String) {
                    imgUrls.push(image)
                }
                else {
                    const data = new FormData();
                    data.append('file', image);
                    data.append('upload_preset', "SocialMedia");
                    data.append('cloud_name', "djqrcbjmu");
                    const data1 = await fetch("	https://api.cloudinary.com/v1_1/djqrcbjmu/image/upload", {
                        method: "post",
                        body: data
                    });
                    const data2 = await data1.json();
                    const url = await data2.secure_url;
                    imgUrls.push(url);

                }
                if (imgUrls.length === images.length) {
                    sdata['images'] = imgUrls;
                    const upload = await axios.put(`https://food-waste-management.herokuapp.com/api/post/${id}`, sdata, {
                        headers: {
                            'authentication': localStorage.getItem('token')
                        }
                    });

                    dispatch({ type: UPDATE_POST, payload: upload.data })

                    eraserData();


                }

            });

        } catch (err) {
            console.log(err.message);
            eraserData();

        }
    }
}


export const DeletePost = (id) => {
    return async (dispatch, getState) => {

        try {
            const status = await axios.delete(`https://food-waste-management.herokuapp.com/api/post/${id}`, {
                headers: {
                    'authentication': localStorage.getItem('token')

                }
            });
            dispatch({
                type: DELETE_POST,
                payload: status.data
            });
        }
        catch (err) {
            console.log(err.message);
        }

    }
}
export const upVote = (postId, currentUserId) => {
    return async (dispatch, getState) => {
        try {
            const vpvoted = await axios.post('https://food-waste-management.herokuapp.com/api/post/upvote', { id: postId }, {
                headers: {
                    'authentication': localStorage.getItem('token')

                }
            });
            dispatch({ type: UP_VOTE, payload: { postId, currentUserId } });

        }
        catch (err) {
            console.log(err.message);
        }



    }
}