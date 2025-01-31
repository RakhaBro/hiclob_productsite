import { useContext, useEffect, useState } from 'react';
import { PopupStateContext } from '../../providers/popup_provider';
import { format } from 'date-fns';
import './feedbackDetail.css';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthStateContext } from '../../providers/auth_provider';

function FeedbackDetail({ feedback_id, feedbackSender, stars, content, likes, lastSubmitted }) {

    const { likedFeedbacks, setLikedFeedbacks } = useContext(AuthStateContext);
    const [isLiked, setIsLiked] = useState(likedFeedbacks.includes(feedback_id));

    const [formattedLastSubmitted, setFormattedLastSubmitted] = useState("");
    const [updatedLikes, setUpdatedLikes] = useState(likes);

    const setup_feedbackTime = async () => {
        if (!isNaN(lastSubmitted)) {
            const lastSubmitted_date = new Date(lastSubmitted * 1000);
            const formattedDate = format(lastSubmitted_date, "MMMM do yyyy");
            setFormattedLastSubmitted(formattedDate);
        }
    }

    useEffect(() => {
        setup_feedbackTime();
    }, []);


    const { setPopupState } = useContext(PopupStateContext);
    const closePopup = () => {
        setPopupState(false, <div></div>);
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

    return (
        <div id='feedbackDetail'>
            <div>
                {/* <p className='lowcolor_text_1'><b>Feedback Detail</b></p> */}
                <div onClick={closePopup} className='btn_close'>
                    <img src={process.env.PUBLIC_URL + 'assets/svg/close.svg'} alt='' />
                </div>
            </div>
            {
                <div className='content'>

                    <div className='upper'>
                        {
                            feedbackSender['photo_url'] !== null
                                ? <img
                                    className='box_shadow_dark'
                                    src={feedbackSender['photo_url']}
                                    alt=''
                                />
                                : <img
                                    className='box_shadow_dark'
                                    src={process.env.PUBLIC_URL + "assets/svg/person.svg"}
                                    alt=''
                                />
                        }
                        <div>
                            <div>
                                <p className='username'>@{feedbackSender['username']}</p>
                                <p className='gradient_text_2 displayname'>{feedbackSender['display_name']}</p>
                            </div>
                            <p className='date_joined lowcolor_text_1'>
                                {
                                    formattedLastSubmitted !== ""
                                        ? "Last submitted " + formattedLastSubmitted
                                        : null
                                }
                            </p>
                        </div>
                    </div>

                    <div className='middle'>
                        <div className='stars_container'>
                            {stars_element}
                            <p className='gradient_text_2'>{stars}/5</p>
                        </div>
                        <div className='like_container gradient_text_2' onClick={setLike}>
                            {updatedLikes}
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    (isLiked === true ? "assets/svg/heart_active.svg" : "assets/svg/heart_inactive.svg")
                                }
                                alt=''
                            />
                        </div>
                    </div>

                    <div className='under'>
                        <p>{content}</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default FeedbackDetail;