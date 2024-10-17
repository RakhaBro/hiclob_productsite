import './feedbacks.css';
import Footer from '../../components/footer/Footer';
import Nav from '../../components/nav/nav';
import FeedbackItem from '../../components/feedbackItem/FeedbackItem.js';
import { useContext, useEffect, useState } from 'react';
import { PopupStateContext } from '../../providers/popup_provider.js';
import FeedbackForm from '../../forms/feedbackForm/FeedbackForm.js';
import { useNavigate } from 'react-router-dom';
import { AuthStateContext } from '../../providers/auth_provider.js';

function FeedbacksPage() {

    const navigate = useNavigate();
    const { userId, availableFeedback, check_feedbackAvailability } = useContext(AuthStateContext);
    const [ isAvailableFeedbackLoaded, setIsAvailableFeedbackLoaded ] = useState(false);

    const initstate = async () => {
        await check_feedbackAvailability();
        setIsAvailableFeedbackLoaded(true);
    }    

    useEffect(() => {
        initstate();
    }, []);

    const download = () => {
        closePopup();
        navigate("/releases");
    }

    const { setPopupState } = useContext(PopupStateContext);

    function showPopup(ui) {
        setPopupState(true, ui);
    }
    
    function closePopup() {
        setPopupState(false, <div></div>);
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div id='feedbacks'>
            <Nav />

            <div id="content_container">
                <div className="nav_solid_layouter"></div>

                <div className='upper'>
                    <div id='general_information'>
                        <div>
                            <h1 className='gradient_text_1'>Feedbacks</h1>
                            <p className='gradient_text_2'>For a Better Hiclob</p>
                        </div>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><p className='gradient_text_2'>Rating</p></td>
                                        <td>
                                            <p>
                                                : 4.5 / 5
                                                <img src={process.env.PUBLIC_URL + 'assets/svg/star_active.svg'} alt='' />
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><p className='gradient_text_2'>Total Feedbacks</p></td>
                                        <td><p>: 1872</p></td>
                                    </tr>
                                    <tr>
                                        <td><p className='gradient_text_2'>Newest Version</p></td>
                                        <td><p>: Hiclob Beta 0.5 (Unstable)</p></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div></div>
                    </div>
                    {
                    isAvailableFeedbackLoaded !== true
                    ? <div id='feedbackLoading_container'></div>
                    : availableFeedback !== null
                        ? <FeedbackItem
                            uid={userId}
                            stars={availableFeedback['star']}
                            content={availableFeedback['feedback']}
                            likes={availableFeedback['likes_num'] ?? 0}
                            lastSubmitted={
                                availableFeedback !== null
                                ? availableFeedback['time_submitted'].seconds
                                : null
                            }
                            isMine={true}
                        />
                        : <div id='startFeedback'>
                            <h2>Start your feedback!</h2>
                            <p className='gradient_text_2'>Help our team to improve Hiclob by giving us your feedback!</p>
                            <button onClick={() => showPopup(<FeedbackForm downloadFunc={download} />)}>
                                <img src={process.env.PUBLIC_URL + 'assets/svg/add.svg'} alt='' />
                                <p>Give feedback</p>
                            </button>
                        </div>
                    }
                </div>

                <div id="content">

                    <FeedbackItem
                        uid={"zkWKeH7naRO70LjQPEXRGMNEsMm2"}
                        stars={3}
                        content={"Just make it simple, this app is kind of awesome! Let me give you 2 answers of why. First, I can meet someone strange that fit my interests. Second, I can create a public talk and many people that I never met before can watch me."}
                        likes={127}
                        lastSubmitted={
                            availableFeedback !== null
                            ? availableFeedback['time_submitted'].seconds
                            : null
                        }
                    />

                    <FeedbackItem
                        uid={"zkWKeH7naRO70LjQPEXRGMNEsMm2"}
                        stars={4}
                        content={"This app is just badasss 🔥🔥. But, Imma give a feedback for improvements. Add country option feature to find new mates!"}
                        likes={80}
                        lastSubmitted={
                            availableFeedback !== null
                            ? availableFeedback['time_submitted'].seconds
                            : null
                        }
                    />

                    <FeedbackItem
                        uid={"zkWKeH7naRO70LjQPEXRGMNEsMm2"}
                        stars={5}
                        content={"Hey, I have an idea to make this app profitable! Limit some feature for free users and push them to get premium! What do you all think about this idea? Please like my feedback if you agree."}
                        likes={2180}
                        lastSubmitted={
                            availableFeedback !== null
                            ? availableFeedback['time_submitted'].seconds
                            : null
                        }
                    />

                    <FeedbackItem
                        uid={"zkWKeH7naRO70LjQPEXRGMNEsMm2"}
                        stars={4}
                        content={"This app is just badasss 🔥🔥. But, Imma give a feedback for improvements. Add country option feature to find new mates!"}
                        likes={80}
                        lastSubmitted={
                            availableFeedback !== null
                            ? availableFeedback['time_submitted'].seconds
                            : null
                        }
                    />

                    <FeedbackItem
                        uid={"zkWKeH7naRO70LjQPEXRGMNEsMm2"}
                        stars={5}
                        content={"Hey, I have an idea to make this app profitable! Limit some feature for free users and push them to get premium! What do you all think about this idea? Please like my feedback if you agree."}
                        likes={2180}
                        lastSubmitted={
                            availableFeedback !== null
                            ? availableFeedback['time_submitted'].seconds
                            : null
                        }
                    />

                    <FeedbackItem
                        uid={"zkWKeH7naRO70LjQPEXRGMNEsMm2"}
                        stars={3}
                        content={"Just make it simple, this app is kind of awesome! Let me give you 2 answers of why. First, I can meet someone strange that fit my interests. Second, I can create a public talk and many people that I never met before can watch me."}
                        likes={127}
                        lastSubmitted={
                            availableFeedback !== null
                            ? availableFeedback['time_submitted'].seconds
                            : null
                        }
                    />

                </div>
            </div>

            <Footer />
        </div>
    );
}

export default FeedbacksPage;