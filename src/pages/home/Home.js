import './home.css';
import { useContext, useEffect, useState } from 'react';
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
                        <p className="gradient_text_2">Match your productivity vibe</p>
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
                            ? <img src={process.env.PUBLIC_URL + "assets/svg/sound_inactive.svg"} alt='' />
                            : <img src={process.env.PUBLIC_URL + "assets/svg/sound_active.svg"} alt='' />
                        }
                    </button>
                </div>
            </div>

            <div className="content reverse">
                <div className="content_visualization_container">
                    <div className="content_visualization box_shadow_dark"></div>
                    <img src={process.env.PUBLIC_URL + '/assets/img/home_1.webp'} alt=''/>
                </div>
                <div className="content_explanation">
                    <h1 className="gradient_text_1">Why Choose Hiclob?</h1>
                    <br />
                    <p className="gradient_text_2">
                        Hiclob empowers you to <span>connect</span> with <span>like-minded</span> individuals
                        by matching you with strangers who share your interests.
                        <br /><br />
                        <span>Effortlessly</span> take the <span>conversation</span> further
                        by chatting with them <span>privately</span>.
                    </p>
                </div>
            </div>

            <div className="content">
                <div className="content_visualization_container">
                    <div className="content_visualization box_shadow_dark"></div>
                    <img src={process.env.PUBLIC_URL + '/assets/img/home_2.webp'} alt=''/>
                </div>
                <div className="content_explanation">
                    <h1 className="gradient_text_1">Your Privacy, Our Priority</h1>
                    <br />
                    <p className="gradient_text_2">
                    At Hiclob, your <span>privacy</span> and <span>comfort</span> come first.
                    <br /><br />
                    If you ever face anything uncomfortable, our <span>easy-to-use reporting</span> system
                    ensures a <span>safe</span> and <span>supportive</span> community for everyone.
                    </p>
                </div>
            </div>

            <Footer />
        </div>

    );
}

export default HomePage;