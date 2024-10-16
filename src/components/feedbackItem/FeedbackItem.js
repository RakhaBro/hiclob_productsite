import { useContext, useState } from 'react';
import { PopupStateContext } from '../../providers/popup_provider.js';
import FeedbackDetail from '../feedbackDetail/FeedbackDetail.js';
import './feedbackItem.css';



function FeedbackItem({ userPhoto, displayName, userName, stars, content, likes, isMine }) {

    const { setPopupState } = useContext(PopupStateContext);

    function showPopup(ui) {
        setPopupState(true, ui);
    }

    const [ isLiked, setIsLiked ] = useState(false);
    
    function setLike() {
        if (isLiked === true) {
            setIsLiked(false);
        } else {
            setIsLiked(true);
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
            <div className="feedback_item">
                <div className="feedback_item_upper" onClick={() => showPopup(<FeedbackDetail />)}>
                    <img
                        src={userPhoto}
                        alt=''
                    />
                    <div>
                        <div className="text_maxline_1"><p>{'@' + userName}</p></div>
                        <div className="text_maxline_1">
                            <p className="gradient_text_2">{displayName}</p>
                        </div>
                    </div>
                </div>
                <div className="feedback_item_middle" onClick={() => showPopup(<FeedbackDetail />)}>
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
                    <p className="gradient_text_2">{likes}</p>
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
    );
}

export default FeedbackItem;