import './nav.css';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthStateContext } from '../../providers/auth_provider';
import { PopupStateContext } from '../../providers/popup_provider';
import Profile from '../profile/Profile';

const Nav = React.memo(() => {

    const { userData } = useContext(AuthStateContext);
    const { setPopupState } = useContext(PopupStateContext);

    function showProfile() {
        setPopupState(true, <Profile />);
    }

    const navigate = useNavigate();
    const location = useLocation();
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const to_home = () => {
        if (location.pathname !== "/") {
            navigate("/");
        } else {
            scrollToTop();
        }
    };
    const to_releases = () => {
        if (location.pathname !== "/releases") {
            navigate("/releases");
        } else {
            scrollToTop();
        }
    };
    const to_feedbacks = () => {
        if (location.pathname !== "/feedbacks") {
            navigate("/feedbacks");
        } else {
            scrollToTop();
        }
    };

    const navblur_threshold = window.innerHeight * .2;
    window.addEventListener('scroll', () => {
        const scrollDistance = window.scrollY;

        document.getElementById("nav").style.transition = ".4s";
        if (scrollDistance >= navblur_threshold) {
            document.getElementById("nav").style.backdropFilter = "blur(12px)";
        } else {
            document.getElementById("nav").style.backdropFilter = "blur(2px)";
        }
    });

    return (
        <div>
            <div id="nav">
                <img src={process.env.PUBLIC_URL + 'assets/img/hiclob_horizontal_white.webp'} alt='' />
                <div id="nav-right">
                    <button onClick={to_home}><p className="gradient_text_2">Home</p></button>
                    <button onClick={to_releases}><p className="gradient_text_2">Releases</p></button>
                    <button onClick={to_feedbacks}><p className="gradient_text_2">Feedbacks</p></button>
                    {userData !== null
                        ? <div className='profilephoto_container'>
                            {userData['photo_url'] !== null
                                ? <img
                                    src={userData['photo_url']} alt=''
                                    onClick={showProfile}
                                    className='photo_url'
                                />
                                : <div className='no_photo_url_container'>
                                    <img
                                        src={process.env.PUBLIC_URL + "assets/svg/person.svg"} alt=''
                                        onClick={showProfile}
                                        className='no_photo_url'
                                    />
                                </div>
                            }
                        </div>
                        : null
                    }
                </div>
            </div>
            <div id="nav-background"></div>
        </div>
    );
});

export default Nav;