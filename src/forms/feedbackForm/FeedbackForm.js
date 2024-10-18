import './feedbackForm.css';
import { useContext, useEffect, useState } from 'react';
import { PopupStateContext } from '../../providers/popup_provider.js';
import LoginForm from '../loginForm/LoginForm.js';
import { AuthStateContext } from '../../providers/auth_provider.js';
import { db } from "../../firebase.js";
import { collection, addDoc, updateDoc, Timestamp, doc, deleteDoc } from "firebase/firestore";

function FeedbackForm({ downloadFunc }) {

    const { setPopupState } = useContext(PopupStateContext);
    const { userId, userData, myFeedback, setMyFeedback, myFeedbackId, setMyFeedbackId } = useContext(AuthStateContext);
    const [starPicked, setStarPicked] = useState(0);
    const [feedback, setFeedback] = useState("");
    let stars_element = []


    const [isAvailableFeedbackLoaded, setIsAvailableFeedbackLoaded] = useState(false);
    const [availableFeedbackId, setAvailableFeedbackId] = useState(null);

    const get_myFeedback = async () => {
        if (myFeedback !== null && myFeedbackId !== null) {
            setAvailableFeedbackId(myFeedbackId);
            setStarPicked(myFeedback['star']);
            setFeedback(myFeedback['feedback']);
        }
        setIsAvailableFeedbackLoaded(true);
    }

    useEffect(() => {
        get_myFeedback();
    }, [myFeedback]);

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

    function pickStar(num) {
        setStarPicked(num);
    }



    const closePopup = () => {
        setPopupState(false, <div></div>);
    }

    const handleChange_feedback = (event) => {
        setFeedback(event.target.value);
    };

    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const send_feedback = async () => {
        if (isSendingFeedback !== true) {
            if (feedback !== null && feedback !== "") {
                setIsSendingFeedback(true);
                const feedback_data_to_send = {
                    uid: userId,
                    star: starPicked,
                    feedback: feedback,
                    time_submitted: Timestamp.now()
                };
                if (availableFeedbackId !== null) {
                    const doc_toUpdate = doc(db, "feedbacks", availableFeedbackId);
                    await updateDoc(doc_toUpdate, feedback_data_to_send)
                } else {
                    const addedDoc = await addDoc(collection(db, "feedbacks"), feedback_data_to_send);
                    setMyFeedbackId(addedDoc.id);
                }
                setMyFeedback(feedback_data_to_send);
                setIsSent(true);
            } else {
                console.log("Fill out the feedback paragraph first!");
                document.getElementById("invalid").style.color = "rgb(255, 68, 83)";
            }
        }
        setIsSendingFeedback(false);
    }

    const [isTryingToDelete, setIsTryingToDelete] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const delete_feedback = async () => {
        await deleteDoc(doc(db, "feedbacks", availableFeedbackId));
        setIsDeleted(true);
        setMyFeedback(null);
    }



    if (userData === null) {
        return (
            <LoginForm downloadFunc={downloadFunc} />
        );
    } else {
        if (isSent !== true) {

            // IF LOADING...
            if (isAvailableFeedbackLoaded !== true) {
                return (
                    <div id='feedbackForm'>
                        <div>
                            <div onClick={closePopup} className='btn_close'>
                                <img src={process.env.PUBLIC_URL + 'assets/svg/close.svg'} alt='' />
                            </div>
                        </div>
                        <div className='loading_container'><p className='lowcolor_text_1'>Loading...</p></div>
                    </div>
                );
            }

            // IF LOADED
            else {

                // SHOW FORM
                if (!isTryingToDelete) {
                    return (
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
                                        {/* <p>Pick the best star!</p> */}
                                        <div className='stars'>
                                            {stars_element}
                                        </div>
                                    </div>
                                    <div className='feedbackfield_container'>
                                        <textarea
                                            rows={3} placeholder='Write your best feedback for Hiclob...'
                                            value={feedback}
                                            onChange={handleChange_feedback}
                                        />
                                        <p id="invalid">Fill the feedback</p>
                                    </div>
                                    <div className='btn_container'>
                                        <button className='btn_primary' onClick={send_feedback}>{
                                            isSendingFeedback === true
                                                ? "Sending..."
                                                : availableFeedbackId !== null ? "Edit Feedback" : "Send Feedback"
                                        }
                                        </button>
                                        {
                                            availableFeedbackId !== null
                                            ? <button className='btn_secondary' onClick={() => setIsTryingToDelete(true)}>Delete</button>
                                            : null
                                        }
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    );
                }

                // IF TRYING TO DELETE
                else {
                    
                    // IF NOT DELETED YET
                    if (!isDeleted) {
                        return (
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
                                            <h1>Delete feedback?</h1>
                                            <p className='gradient_text_2'>You cannot restore the deleted feedback.</p>
                                        </div>
                                        <div className='btn_container'>
                                            <button className='btn_primary' onClick={delete_feedback}>Delete</button>
                                            <button className='btn_secondary' onClick={() => setIsTryingToDelete(false)}>Cancel</button>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        );
                    }

                    // IF DELETED
                    else {
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
                                            <h1>Feedback deleted!</h1>
                                            <p className='gradient_text_2'>You send the feedback again.</p>
                                        </div>
                                        <div className='btn_container'>
                                            <button className='btn_primary' onClick={closePopup}>Close</button>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        );
                    }
                }
            }
        }
        // IF FORM SENDED
        else {
            return (
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
                            <button className='btn_primary' onClick={closePopup}>Close</button>
                        </div>
                        <div></div>
                    </div>
                </div>
            );

        }
    }
}

export default FeedbackForm;