import Footer from '../../components/footer/Footer';
import Nav from '../../components/nav/nav';
import FeedbackItem from '../../components/feedbackItem/FeedbackItem.js';
import './feedbacks.css';
import { useContext, useEffect } from 'react';
import { PopupStateContext } from '../../providers/popup_provider.js';
import FeedbackForm from '../../forms/feedbackForm/FeedbackForm.js';
import { useNavigate } from 'react-router-dom';

function FeedbacksPage() {

    const navigate = useNavigate();

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
                    <div id='startFeedback'>
                        <h2>Start your feedback!</h2>
                        <p className='gradient_text_2'>Help our team to improve Hiclob by giving us your feedback!</p>
                        <button onClick={() => showPopup(<FeedbackForm downloadFunc={download} />)}>
                            <img src={process.env.PUBLIC_URL + 'assets/svg/add.svg'} alt='' />
                            <p>Give feedback</p>
                        </button>
                    </div>
                </div>

                <div id="content">

                    <FeedbackItem
                        userPhoto={"https://media.licdn.com/dms/image/v2/D5603AQEB46WT0XfM2Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722751862435?e=2147483647&v=beta&t=8xYIHAe6eyZ9yhL_yLAwKb4RsK5pJwuXh-ZOJJqlsrg"}
                        displayName={"Muhammad Rakha Fadhilah"}
                        userName={"rakha__fadhilah"}
                        stars={3}
                        content={"Just make it simple, this app is kind of awesome! Let me give you 2 answers of why. First, I can meet someone strange that fit my interests. Second, I can create a public talk and many people that I never met before can watch me."}
                        likes={127}
                    />

                    <FeedbackItem
                        userPhoto={"https://firebasestorage.googleapis.com/v0/b/heyclob-test.appspot.com/o/profile_pictures%2F74HWXUm6UbUrcUQMQdZVNt5TTrn1.jpg.jpg?alt=media&token=8960279b-6dd4-4f71-9a02-fc1d7619f86d"}
                        displayName={"Hanif Sholatan"}
                        userName={"hanifsltn"}
                        stars={4}
                        content={"This app is just badasss 🔥🔥. But, Imma give a feedback for improvements. Add country option feature to find new mates!"}
                        likes={80}
                    />

                    <FeedbackItem
                        userPhoto={"https://firebasestorage.googleapis.com/v0/b/heyclob-test.appspot.com/o/profile_pictures%2Fhf6dDeUtHCXTw4vhPjGiAC5ob8n1.jpg?alt=media&token=b471326b-79a1-4133-8672-ba82a5fc5ce2"}
                        displayName={"Mello"}
                        userName={"mello48"}
                        stars={5}
                        content={"Hey, I have an idea to make this app profitable! Limit some feature for free users and push them to get premium! What do you all think about this idea? Please like my feedback if you agree."}
                        likes={2180}
                    />

                    <FeedbackItem
                        userPhoto={"https://firebasestorage.googleapis.com/v0/b/heyclob-test.appspot.com/o/profile_pictures%2F74HWXUm6UbUrcUQMQdZVNt5TTrn1.jpg.jpg?alt=media&token=8960279b-6dd4-4f71-9a02-fc1d7619f86d"}
                        displayName={"Hanif Sholatan"}
                        userName={"hanifsltn"}
                        stars={4}
                        content={"This app is just badasss 🔥🔥. But, Imma give a feedback for improvements. Add country option feature to find new mates!"}
                        likes={80}
                    />

                    <FeedbackItem
                        userPhoto={"https://firebasestorage.googleapis.com/v0/b/heyclob-test.appspot.com/o/profile_pictures%2Fhf6dDeUtHCXTw4vhPjGiAC5ob8n1.jpg?alt=media&token=b471326b-79a1-4133-8672-ba82a5fc5ce2"}
                        displayName={"Mello"}
                        userName={"mello48"}
                        stars={5}
                        content={"Hey, I have an idea to make this app profitable! Limit some feature for free users and push them to get premium! What do you all think about this idea? Please like my feedback if you agree."}
                        likes={2180}
                    />

                    <FeedbackItem
                        userPhoto={"https://media.licdn.com/dms/image/v2/D5603AQEB46WT0XfM2Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722751862435?e=2147483647&v=beta&t=8xYIHAe6eyZ9yhL_yLAwKb4RsK5pJwuXh-ZOJJqlsrg"}
                        displayName={"Muhammad Rakha Fadhilah"}
                        userName={"rakha__fadhilah"}
                        stars={3}
                        content={"Just make it simple, this app is kind of awesome! Let me give you 2 answers of why. First, I can meet someone strange that fit my interests. Second, I can create a public talk and many people that I never met before can watch me."}
                        likes={127}
                    />

                </div>
            </div>

            <Footer />
        </div>
    );
}

export default FeedbacksPage;