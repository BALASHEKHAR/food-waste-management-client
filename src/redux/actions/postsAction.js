import {
    CREATE_POST,
    LOAD_POSTS,
    UPDATE_POST,
    DELETE_POST,
    ERROR
} from '../actionTypes';
import axios from 'axios'

export const LoadPosts = () => {
    return async (dispatch, getState) => {
        try {
            const posts = await axios.get('/api/post/allposts');

            dispatch({ type: LOAD_POSTS, payload: posts.data })
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
                    const upload = await axios.post('/api/post/addpost', sdata, {
                        headers: {
                            'authentication': localStorage.getItem('token')
                        }
                    });

                    console.log(upload.data)
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
                    console.log(imgUrls)
                    sdata['images'] = imgUrls;
                    const upload = await axios.put(`/api/post/${id}`, sdata, {
                        headers: {
                            'authentication': localStorage.getItem('token')
                        }
                    });

                    console.log(upload.data)
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

            console.log(id)
            const status = await axios.delete(`/api/post/${id}`, {
                headers: {
                    'authentication': localStorage.getItem('token')

                }
            });
            console.log(status.data)
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