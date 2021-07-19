import React, { useState, useRef, useEffect } from 'react';
import './Home.css'
import nofoodwaste from '../../Media/nofoodwaste.png'
import aboutUsImg from '../../Media/about_us_img.jpg'
import helpingHands from '../../Media/helpingHands.jpg'
import mission from '../../Media/mission.jpg'
import contactUs from '../../Media/contactUs.jpg'
import { useHistory } from 'react-router-dom';


function Home(props) {
    const history = useHistory();
    const [first_name, setFirst_name] = useState("")
    const [full_name, setFull_name] = useState("")
    const [desc, setDesc] = useState("")

    let first_name_ref = useRef();
    let full_name_ref = useRef();
    let desc_ref = useRef();



    const handleSubmit = () => {
        if (first_name.trim().length < 2) {
            first_name_ref.current.style.border = "2px  solid red";
            setFirst_name("");
            return
        }
        if (full_name.trim().length < 2) {
            full_name_ref.current.style.border = "2px  solid red";
            setFull_name("");
            return
        }
        if (desc.trim().length < 2) {
            desc_ref.current.style.border = "2px  solid red";
            setDesc("");
            return
        }

        console.log("valid");
        setFirst_name("");
        setFull_name("");
        setDesc("");
    }
    const openDonatePage = () => {
        history.push('donate')
    }


    return (

        < div >
            {/* first look start */}
            < img className="bg_img" src="https://www.hospitalitynet.org/picture/xxl_153119308.jpg?t=20201006094308" alt="bg-img" />

            <div className="home-container">
                <div className="home-container-logo">
                    <img src={nofoodwaste} alt="nofoodwaste" />
                </div>
                <div className="home-container-details">
                    <h1>Feed the Hungry</h1>
                    <h4>If you can't feed <b>HUNDRED</b> then just feed <b>ONE</b></h4>
                    <button onClick={openDonatePage} className="home-donate-buttton">Donate</button>
                </div>
            </div>

            {/* first look end */}

            {/* about us start */}

            <div id="about_us" className="about_us_container">
                <div className="about_us_left">
                    <h2>ABOUT US</h2>
                    <hr /><br />
                    <p>Waste management is one of the main concerns with our environment which impacts the health of our society. A significant amount of waste disposed by people are organic material. Kitchen wastes like food scraps disposed by families and restaurants, are becoming in large amounts and the natural capacity of the environment cannot assimilate them. </p>
                </div>
                <div className="about_us_right">
                    <img src={aboutUsImg} alt="about_us_img" className="about_us_img" />
                </div>
            </div>

            {/* about us end */}

            {/* helping hands start */}

            <div className="helping_hands">
                <img src={helpingHands} alt="bg_img" className="helping_hands_bg_img" />
                <div className="helping_hands_main">
                    <h2>Welcome to server Needy</h2>
                    <hr /><br />
                    <p>
                        This website is a Registered Non-Profitable and Non-Religious Social Service Oraganisation. We work 24/7 to serve poor and needy. Our passion remains in feeding the hungry. We offer help whole theartedly to the needy.
                    </p>
                </div>
            </div>

            {/* helping hands end */}

            {/* our mission start */}
            <div className="mission">
                <div className="mission_left">
                    <img src={mission} alt="mission_img" className="mission_img" />
                </div>
                <div className="mission_right">
                    <h2>OUR MISSION</h2>
                    <hr /><br />
                    <p>Waste management is one of the main concerns with our environment which impacts the health of our society. A significant amount of waste disposed by people are organic material. Kitchen wastes like food scraps disposed by families and restaurants, are becoming in large amounts and the natural capacity of the environment cannot assimilate them. </p>
                </div>
            </div>
            {/* our mission end */}

            {/* contact us start */}
            <div className="contact_us">
                <div className="contact_us_img">
                    <img src={contactUs} alt="contactus" className="contact_us_img" />
                </div>
                <div className="contact_us_main">
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="contact_us_form">
                        <label>First Name :</label><br />
                        <input
                            ref={first_name_ref}
                            className="first_name"
                            value={first_name}
                            onChange={(e) => {
                                first_name_ref.current.style.border = "none";
                                setFirst_name(e.target.value)
                            }}
                            type="text"
                            required />
                        <br /><br />
                        <label>Full Name :</label><br />
                        <input
                            ref={full_name_ref}
                            className="full_name"
                            value={full_name}
                            onChange={(e) => {
                                full_name_ref.current.style.border = "none";
                                setFull_name(e.target.value)
                            }}
                            type="text"
                            required />
                        <br /><br />
                        <label>Description :</label><br />
                        <textarea
                            ref={desc_ref}
                            value={desc}
                            onChange={(e) => {
                                desc_ref.current.style.border = "none"
                                setDesc(e.target.value)
                            }}
                            type="text"
                            required
                            rows="3">
                        </textarea>
                        <button type="submit" className="contact_submit"> Submit</button>
                    </form>
                </div>
            </div>
            {/* contact us end */}
        </div >
    )
}


export default Home;
