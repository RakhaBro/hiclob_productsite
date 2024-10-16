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
    
    return (
        <div id="download">
            <Nav />

            <div id="header">
                <h1>Thank you!</h1>
                <p>How cool, can't wait to see you in Hiclob!</p>
                <br /><br />
                <button onClick={see_feedbacks}>
                    See Feedbacks
                    <img src={process.env.PUBLIC_URL + 'assets/svg/right_arrow.svg'} alt='' />
                </button>
            </div>

            <Footer />
        </div>
    );
}

export default DownloadPage;