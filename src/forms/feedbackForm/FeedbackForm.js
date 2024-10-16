import { useContext, useState } from 'react';
import { PopupStateContext } from '../../providers/popup_provider.js';
import LoginForm from '../loginForm/LoginForm.js';
import { AuthStateContext } from '../../providers/auth_provider.js';
import './feedbackForm.css';

function FeedbackForm({downloadFunc}) {

    const [ starPicked, setStarPicked ] = useState(0);
    function pickStar( num ) {
        setStarPicked(num);
    }

    let stars_element = []
    for (let i = 1; i <= 5; i++) {
        var star_img_src = starPicked !== null && i <= starPicked
            ? 'assets/svg/star_active.svg'
            : 'assets/svg/star_inactive.svg';
        stars_element.push(
            <img
                onClick={() => pickStar(i)}
                src={process.env.PUBLIC_URL + star_img_src}
                alt=''
            />
        );
    }


    const { setPopupState } = useContext(PopupStateContext);
    const { user } = useContext(AuthStateContext);
    
    const closePopup = () => {
        setPopupState(false, <div></div>);
    }

    const [ feedback, setFeedback ] = useState();
    const handleChange_feedback = (event) => {
        setFeedback(event.target.value);
    };

    const [ isSent, setIsSent ] = useState(false);
    const send_feedback = async () => {
        setIsSent(true);
    }



    if (user === null) {
        return(
            <LoginForm downloadFunc={downloadFunc} />
        );
    } else {
        if (isSent !== true) {
            
            return(
                <div id='feedbackForm'>
                    <div>
                        <div onClick={closePopup} className='btn_close'>
                            <img src={process.env.PUBLIC_URL + 'assets/svg/close.svg'} alt='' />
                        </div>
                    </div>
                    <div className='content'>
                        <div>
                            <img
                                className='hiclobLogo'
                                src={process.env.PUBLIC_URL + 'assets/img/hiclob_horizontal_white.webp'}
                                alt=''
                            />
                            <p className='gradient_text_2'>Give us your best feedback!</p>
                        </div>
                        <div className='feedbackform'>
                            <div className='upper'>
                                <p>Pick the best star!</p>
                                <div className='stars'>
                                    {stars_element}
                                </div>
                            </div>
                            <textarea
                                cols={4} placeholder='Write your best paragraph for the feedback...'
                                value={feedback}
                                onChange={handleChange_feedback}
                            />
                            <button onClick={send_feedback}>Send Feedback</button>
                        </div>
                        <div></div>
                    </div>
                </div>
            );
        } else {
            return(
                <div id='feedbackForm'>
                    <div>
                        <div onClick={closePopup} className='btn_close'>
                            <img src={process.env.PUBLIC_URL + 'assets/svg/close.svg'} alt='' />
                        </div>
                    </div>
                    <div className='content'>
                        <img
                            className='hiclobLogo'
                            src={process.env.PUBLIC_URL + 'assets/img/hiclob_horizontal_white.webp'}
                            alt=''
                        />
                        <div className='feedbackform'>
                            <div className='upper'>
                                <h1>Thank you!</h1>
                                <p className='gradient_text_2'>We appreciate your feedback. We will consider your feedback for our improvement.</p>
                            </div>
                            <button onClick={closePopup}>Close</button>
                        </div>
                        <div></div>
                    </div>
                </div>
            );

        }
    }
}

export default FeedbackForm;