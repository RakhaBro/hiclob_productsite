import './feedbacks.css';
import Footer from '../../components/footer/Footer';
import Nav from '../../components/nav/nav';
import FeedbackItem from '../../components/feedbackItem/FeedbackItem.js';
import { useContext, useEffect, useState } from 'react';
import { PopupStateContext } from '../../providers/popup_provider.js';
import FeedbackForm from '../../forms/feedbackForm/FeedbackForm.js';
import { useNavigate } from 'react-router-dom';
import { AuthStateContext } from '../../providers/auth_provider.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase.js';

function FeedbacksPage() {

    const navigate = useNavigate();
    const { userId, availableFeedback, check_feedbackAvailability } = useContext(AuthStateContext);
    const [isAvailableFeedbackLoaded, setIsAvailableFeedbackLoaded] = useState(false);

    const [feedbacks, setFeedbacks] = useState([]);
    const [isFeedbacksLoaded, setIsFeedbacksLoaded] = useState(false);
    const fetch_feedbacks = async () => {
        const feedbacks_snapshot = await getDocs(query(
            collection(db, 'feedbacks'),
            where('uid', '!=', userId)
        ))
        const feedback_list = feedbacks_snapshot.docs.map(
            doc => ({
                id: doc.id,
                data: doc.data()
            })
        );
        setFeedbacks(feedback_list);
        setIsFeedbacksLoaded(true);
    }

    const initstate = async () => {
        await fetch_feedbacks();
        await check_feedbackAvailability();
        setIsAvailableFeedbackLoaded(true);
    }

    useEffect(() => {
        initstate();
    }, [check_feedbackAvailability()]);

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
                        isAvailableFeedbackLoaded === true && (feedbacks.length < 1 || feedbacks.length >= 3)
                            ? availableFeedback !== null
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
                            : <div id='feedbackLoading_container'></div>
                    }
                </div>

                <div id="content">
                    {
                        feedbacks.length < 1
                            ? (
                                !isFeedbacksLoaded
                                    ? (<div><p><b>Loading...</b></p></div>)
                                    : (<div><p><b>No any other feedbacks found.</b></p></div>)
                            )
                            : ([
                                isAvailableFeedbackLoaded === true && (feedbacks.length > 0 && feedbacks.length < 3)
                                    ? availableFeedback !== null
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
                                    : null,
                                ...feedbacks.map((feedback) => (
                                    <FeedbackItem
                                        key={feedback.id}
                                        uid={feedback.data['uid']}
                                        stars={feedback.data['star']}
                                        content={feedback.data['feedback']}
                                        likes={feedback.data['likes'] ?? 0}
                                        lastSubmitted={feedback.data['time_submitted']}
                                    />
                                ))
                            ])
                    }
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default FeedbacksPage;