import Nav from '../../components/nav/nav.js';
import Footer from '../../components/footer/Footer.js';
import './download.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function DownloadPage() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);
    
    const navigate = useNavigate();

    const see_feedbacks = () => {
        navigate("/feedbacks");
    }

    const back_to_home = () => {
        navigate("/");
    }
    
    return (
        <div id="download">
            <Nav />

            <div id="header">
                <h1 className='gradient_text_1'>Under Development</h1>
                <br />
                <p className='gradient_text_2'>
                Thank you for your interest in Hiclob! Our platform is still under development,
                and we're working hard to bring you the best experience.
                <br /><br />
                Stay tuned for
                updates—exciting things are on the way!
                </p>
                <br /><br />
                <button onClick={back_to_home}>
                    Back to Home
                    <img src={process.env.PUBLIC_URL + 'assets/svg/right_arrow.svg'} alt='' />
                </button>
            </div>

            <Footer />
        </div>
    );
}

export default DownloadPage;