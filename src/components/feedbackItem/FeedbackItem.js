import React, { useContext, useEffect, useState } from 'react';
import { PopupStateContext } from '../../providers/popup_provider.js';
import FeedbackDetail from '../feedbackDetail/FeedbackDetail.js';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';
import FeedbackForm from '../../forms/feedbackForm/FeedbackForm.js';
import { useNavigate } from 'react-router-dom';
import './feedbackItem.css';
import { AuthStateContext } from '../../providers/auth_provider.js';



const FeedbackItem = React.memo(({ feedback_id, uid, stars, content, likes, lastSubmitted, isMine }) => {

    const { setPopupState } = useContext(PopupStateContext);
    const { likedFeedbacks, setLikedFeedbacks } = useContext(AuthStateContext);
    const [isLiked, setIsLiked] = useState(likedFeedbacks.includes(feedback_id));
    const [ feedbackSender, setFeedbackSender ] = useState(null);
    const [ isLoaded, setIsloaded ] = useState(false);
    const [ updatedLikes, setUpdatedLikes ] = useState(likes);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLiked(likedFeedbacks.includes(feedback_id));
    }, [likedFeedbacks]);

    const [ isLikeWorking, setIsLikeWorking ] = useState(false);
    const setLike = async () => {
        if (isLikeWorking !== true) {
            setIsLikeWorking(true);
            if (isLiked === true) {
                setUpdatedLikes(updatedLikes - 1);
                setIsLiked(!isLiked);
                await updateDoc(doc(db, "feedbacks", feedback_id), {
                    'likes': increment(-1)
                });
                
                // Remove liked feedbacks in local storage
                setLikedFeedbacks(likedFeedbacks.filter(id => id !== feedback_id));
                
            } else {
                setUpdatedLikes(updatedLikes + 1);
                setIsLiked(!isLiked);
                await updateDoc(doc(db, "feedbacks", feedback_id), {
                    'likes': increment(1)
                });

                // Push liked feedbacks in local storage
                setLikedFeedbacks([...likedFeedbacks, feedback_id]);
            }
            setIsLikeWorking(false);
        }
    }

    const feedbackDetetail_ui = <FeedbackDetail
        feedback_id={feedback_id}
        feedbackSender={feedbackSender}
        stars={stars}
        content={content}
        likes={updatedLikes}
        lastSubmitted={lastSubmitted}
    />;

    const get_feedbackSender = async () => {
        try {
            const userRef = doc(db, "users", uid);
            const user_snapshot = await getDoc(userRef);
            if (user_snapshot.exists) {
                const user_data = user_snapshot.data();
                setFeedbackSender(user_data);
                setIsloaded(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        get_feedbackSender();
    }, []);

    function closePopup() {
        setPopupState(false, <div></div>);
    }

    function showPopup(ui) {
        if (isMine === true) {
            setPopupState(
                true,
                <FeedbackForm downloadFunc={() => {
                    closePopup();
                    navigate("/releases");
                }}
            />
            );
        } else {
            setPopupState(true, ui);
        }
    }


    let stars_element = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= stars) {
            stars_element.push(
                <img src={process.env.PUBLIC_URL + "assets/svg/star_active.svg"} alt='' />
            );
        } else {
            stars_element.push(
                <img src={process.env.PUBLIC_URL + "assets/svg/star_inactive.svg"} alt='' />
            );
        }
    }

    return (
        <div className="feedback_item_wrapper box_shadow_dark">
            {
                isLoaded !== true
                ? <div className="feedback_item"></div>
                : <div className="feedback_item">
                    <div
                        className="feedback_item_upper"
                        onClick={isMine !== true ? () => showPopup(feedbackDetetail_ui) : null}
                    >
                        {feedbackSender['photo_url'] !== null
                            ? <img
                                src={feedbackSender['photo_url'] ?? ""}
                                alt=''
                            />
                            : <img
                                src={process.env.PUBLIC_URL + "assets/svg/person.svg"}
                                alt=''
                            />
                        }
                        <div>
                            <div className="text_maxline_1">
                                <p>{'@' + feedbackSender['username']}{isMine === true ? " (You)" : null}</p>
                            </div>
                            <div className="text_maxline_1">
                                <p className="gradient_text_2">{feedbackSender['display_name']}</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="feedback_item_middle"
                        onClick={isMine !== true ? () => showPopup(feedbackDetetail_ui) : null}
                    >
                        <div className="stars_container">
                            {stars_element}
                        </div>
                        <div className="feedback_text">
                            <p className="gradient_text_2">
                                {content}
                            </p>
                        </div>
                    </div>
                    <div className="feedback_item_under">
                        <div>
                            {isMine === true
                                ? <button onClick={() => showPopup(feedbackDetetail_ui)}>
                                    <img src={process.env.PUBLIC_URL + "assets/svg/edit.svg"} alt='' />
                                    Edit
                                </button>
                                : null
                            }
                        </div>
                        <div className='like_container'>
                            <p className="gradient_text_2">{updatedLikes}</p>
                            <img
                                onClick={setLike}
                                src={
                                    process.env.PUBLIC_URL +
                                    (isLiked === true ? "assets/svg/heart_active.svg" : "assets/svg/heart_inactive.svg")
                                }
                                alt=''
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
});

export default FeedbackItem;