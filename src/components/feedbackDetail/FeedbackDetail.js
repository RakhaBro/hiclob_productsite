import { useContext, useState } from 'react';
import { PopupStateContext } from '../../providers/popup_provider';
import './feedbackDetail.css';

function FeedbackDetail() {

    const { setPopupState } = useContext(PopupStateContext);
    const closePopup = () => {
        setPopupState(false, <div></div>);
    }

    let stars_element = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= 3) {
            stars_element.push(
                <img src={process.env.PUBLIC_URL + "assets/svg/star_active.svg"} alt='' />
            );
        } else {
            stars_element.push(
                <img src={process.env.PUBLIC_URL + "assets/svg/star_inactive.svg"} alt='' />
            );
        }
    }

    const [ isLiked, setIsLiked ] = useState(false);

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
            <div className='content'>
                
                <div className='upper'>
                    <img
                        className='box_shadow_dark'
                        src="https://media.licdn.com/dms/image/v2/D5603AQEB46WT0XfM2Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722751862435?e=2147483647&v=beta&t=8xYIHAe6eyZ9yhL_yLAwKb4RsK5pJwuXh-ZOJJqlsrg"
                        alt=''
                    />
                    <div>
                        <div>
                            <p className='username'>@rakha__fadhilah</p>
                            <p className='gradient_text_2 displayname'>Muhammad Rakha Fadhilah</p>
                        </div>
                        <p className='date_joined lowcolor_text_1'>Joined Hiclob since September 20th 2024</p>
                    </div>
                </div>

                <div className='middle'>
                    <div className='stars_container'>
                        {stars_element}
                        <p className='gradient_text_2'>3/5</p>
                    </div>
                    <div className='like_container gradient_text_2' onClick={setLike}>
                        137
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
                    <p>
                        Just make it simple, this app is kind of awesome! Let me give you 2 answers of why. First, I can meet someone strange that fit my interests.
                        Second, I can create a public talk and many people that I never met before can watch me.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FeedbackDetail;