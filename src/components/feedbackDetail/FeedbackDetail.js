import { useContext, useEffect, useState } from 'react';
import { PopupStateContext } from '../../providers/popup_provider';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { format } from 'date-fns';
import './feedbackDetail.css';

function FeedbackDetail({ uid, stars, content, likes, lastSubmitted, isMine }) {

    const [ feedbackSender, setFeedbackSender ] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [ formattedLastSubmitted, setFormattedLastSubmitted ] = useState(null);

    const setup_feedbackData = async () => {
        try {
            console.log("tes");
            const userRef = doc(db, "users", uid);
            const user_snapshot = await getDoc(userRef);
            if (user_snapshot.exists) {
                const user_data = user_snapshot.data();
                setFeedbackSender(user_data);
                console.log("Feedback sender = " + JSON.stringify(feedbackSender));
            }
            if (lastSubmitted !== undefined) {
                const lastSubmitted_date = lastSubmitted.toDate();
                const formattedDate = format(lastSubmitted_date, "MMMM do yyyy");
                setFormattedLastSubmitted(formattedDate);
            }
            setIsloaded(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setup_feedbackData();
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

    const [isLiked, setIsLiked] = useState(false);

    function setLike() {
        if (isLiked === true) {
            setIsLiked(false);
        } else {
            setIsLiked(true);
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
                isLoaded !== true
                    ? <div className='content'>
                        <div className='upper'></div>
                        <div className='middle'>
                            <p>Loading...</p>
                        </div>
                        <div className='under'></div>
                    </div>
                    : <div className='content'>

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
                                        formattedLastSubmitted !== null
                                            ? "Last submitted" + {formattedLastSubmitted}
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
                                {likes}
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