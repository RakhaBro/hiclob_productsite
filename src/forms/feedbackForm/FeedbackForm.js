import './feedbackForm.css';
import { useContext, useEffect, useState } from 'react';
import { PopupStateContext } from '../../providers/popup_provider.js';
import LoginForm from '../loginForm/LoginForm.js';
import { AuthStateContext } from '../../providers/auth_provider.js';
import { db } from "../../firebase.js";
import { collection, addDoc, updateDoc, Timestamp, getDocs, query, where, doc } from "firebase/firestore";

function FeedbackForm({downloadFunc}) {

    const { setPopupState } = useContext(PopupStateContext);
    const { userId, userData } = useContext(AuthStateContext);
    const [ starPicked, setStarPicked ] = useState(0);
    const [ feedback, setFeedback ] = useState("");
    let stars_element = []


    const [ isAvailableFeedbackLoaded, setIsAvailableFeedbackLoaded] = useState(false);
    const [ availableFeedbackId, setAvailableFeedbackId ] = useState(null);

    const get_availableDocs = async () => {
        const availableFeedback_queried = await getDocs(query(
            collection(db, 'feedbacks'),
            where('uid', '==', userId)
        ));
        const availableFeedback_doc = availableFeedback_queried.docs[0];
        if (availableFeedback_queried.docs.length > 0) {
            setAvailableFeedbackId(availableFeedback_queried.docs[0].id);
            var availableFeedback_data = availableFeedback_doc.data();
            setStarPicked(availableFeedback_data['star']);
            setFeedback(availableFeedback_data['feedback']);
        }
        setIsAvailableFeedbackLoaded(true);
    }

    useEffect(() => {
        get_availableDocs();
    }, [userData]);
    
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

    function pickStar( num ) {
        setStarPicked(num);
    }


    
    const closePopup = () => {
        setPopupState(false, <div></div>);
    }

    const handleChange_feedback = (event) => {
        setFeedback(event.target.value);
    };

    const [ isSendingFeedback, setIsSendingFeedback ] = useState(false);
    const [ isSent, setIsSent ] = useState(false);
    const send_feedback = async () => {
        if (isSendingFeedback !== true) {
            if (feedback !== null && feedback !== "") {
                setIsSendingFeedback(true);
                if (availableFeedbackId !== null) {
                    const doc_toUpdate = doc(db, "feedbacks", availableFeedbackId);
                    await updateDoc(doc_toUpdate, {
                        uid: userId,
                        star: starPicked,
                        feedback: feedback,
                        time_submitted: Timestamp.now()
                    })
                } else {
                    await addDoc(collection(db, "feedbacks"), {
                        uid: userId,
                        star: starPicked,
                        feedback: feedback,
                        time_submitted: Timestamp.now()
                    });
                }
                setIsSent(true);
            } else {
                console.log("Fill out the feedback paragraph first!");
                document.getElementById("invalid").style.color = "rgb(255, 68, 83)";
            }
        }
        setIsSendingFeedback(false);
    }



    if (userData === null) {
        return(
            <LoginForm downloadFunc={downloadFunc} />
        );
    } else {
        if (isSent !== true) {
            
            if (isAvailableFeedbackLoaded !== true) {
                return(
                    <div id='feedbackForm'>
                        <div>
                            <div onClick={closePopup} className='btn_close'>
                                <img src={process.env.PUBLIC_URL + 'assets/svg/close.svg'} alt='' />
                            </div>
                        </div>
                        <div className='loading_container'><p className='lowcolor_text_1'>Loading...</p></div>
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
                                <div className='feedbackfield_container'>
                                    <p id="invalid">Fill the feedback</p>
                                    <textarea
                                        rows={4} placeholder='Write your best feedback for Hiclob...'
                                        value={feedback}
                                        onChange={handleChange_feedback}
                                    />
                                </div>
                                <button onClick={send_feedback}>{
                                    isSendingFeedback === true
                                        ? "Sending..."
                                        : availableFeedbackId !== null ? "Edit Feedback" : "Send Feedback"
                                    }
                                </button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                );
            }
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