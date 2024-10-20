import './home.css';
import { useContext, useEffect, useRef, useState } from 'react';
import Nav from '../../components/nav/nav.js';
import Footer from '../../components/footer/Footer.js';
import DownloadConfirmation from '../../components/downloadConfirmation/DownloadConfirmation.js';
import { PopupStateContext } from '../../providers/popup_provider.js';
import { useNavigate } from 'react-router-dom';

function HomePage() {

    const [isVideoMuted, setIsVideoMuted] = useState(true);
    const { setPopupState } = useContext(PopupStateContext);
    const navigate = useNavigate();

    function showPopup(ui) {
        setPopupState(true, ui);
    }

    const download_android = () => {
        showPopup(<DownloadConfirmation os={"Android"} navigateFunc={() => navigate("/download")} />);
    };

    const download_ios = () => {
        showPopup(<DownloadConfirmation os={"IOS"} navigateFunc={() => navigate("/download")} />);
    };
    
    useEffect(() => {
        document.getElementById("header").style.filter = "brightness(0)";
        document.getElementById("header").style.transition = "1s";
        document.getElementById("header").style.filter = "brightness(1)";
        document.getElementById("backdrop-video").style.opacity = "0";
        document.getElementById("backdrop-video").style.transition = "3s";
        document.getElementById("backdrop-video").style.opacity = "1";
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div id='home'>
            <Nav />

            <div id="header">
                <div id="header-left">
                    <div>
                        <h1 className="mandala gradient_text_2">Hiclob</h1>
                        <p className="gradient_text_2">Seek & say hello to strangers you are interested in!</p>
                    </div>
                    <div id="header-left-bottom">
                        <button onClick={download_android}>
                            <img src={process.env.PUBLIC_URL + '/assets/svg/android.svg'} alt=''/>
                            <img src={process.env.PUBLIC_URL + '/assets/svg/android.svg'} alt=''/>
                            <img src={process.env.PUBLIC_URL + '/assets/svg/download.svg'} className="img_download" alt=''/>
                            <p>Download Android</p>
                        </button>
                        <button onClick={download_ios}>
                            <img src={process.env.PUBLIC_URL + '/assets/svg/apple.svg'} alt=''/>
                            <img src={process.env.PUBLIC_URL + '/assets/svg/download.svg'} className="img_download" alt=''/>
                            <p>Download IOS</p>
                        </button>
                    </div>
                </div>
                <video
                    id='backdrop-video'
                    src={process.env.PUBLIC_URL + "assets/video/hiclob_introduction.mp4"}
                    autoPlay
                    loop
                    playsInline
                    muted={isVideoMuted}
                />
                <div className='header-video-fade'>
                    <button onClick={() => setIsVideoMuted(!isVideoMuted)}>
                        {
                            isVideoMuted === true
                            ? <img src={process.env.PUBLIC_URL + "assets/svg/sound_inactive.svg"} />
                            : <img src={process.env.PUBLIC_URL + "assets/svg/sound_active.svg"} />
                        }
                    </button>
                </div>
            </div>

            <div className="content reverse">
                <div className="content_visualization_container">
                    <div className="content_visualization box_shadow_dark"></div>
                    <img src={process.env.PUBLIC_URL + '/assets/img/hiclob_1.webp'} alt=''/>
                </div>
                <div className="content_explanation">
                    <h1 className="gradient_text_1">Why Hiclob?</h1>
                    <p className="gradient_text_2">
                        We provide the ability to manage what kind of person
                        you would like to look for to talk with.
                        <br /><br />
                        You can continue talking with someone you found just by following
                        their account.
                    </p>
                </div>
            </div>

            <div className="content">
                <div className="content_visualization_container">
                    <div className="content_visualization box_shadow_dark"></div>
                    <img src={process.env.PUBLIC_URL + '/assets/img/hiclob_1.webp'} alt=''/>
                </div>
                <div className="content_explanation">
                    <h1 className="gradient_text_1">Is The Privacy Safe?</h1>
                    <p className="gradient_text_2">
                        Yes, we guarantee your privacy safety and your comportability
                        in Hiclob ecosystem.
                        <br /><br />
                        You can report anything that makes you uncomfortable when you are on Hiclob.
                    </p>
                </div>
            </div>

            <Footer />
        </div>

    );
}

export default HomePage;