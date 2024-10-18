import { useContext, useState } from 'react';
import './loginForm.css';
import { PopupStateContext } from '../../providers/popup_provider';
import { AuthStateContext } from '../../providers/auth_provider';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, doc, getDocs, getDoc, limit } from 'firebase/firestore';
import { auth, db } from '../../firebase.js';

function LoginForm({downloadFunc}) {

    const { setPopupState } = useContext(PopupStateContext);
    const { setUser } = useContext(AuthStateContext);
    
    const closePopup = () => {
        setPopupState(false, <div></div>);
    }

    const [email_or_username, set_email_or_username] = useState("");
    const handleChange_email_or_username = (event) => {
        set_email_or_username(event.target.value);
    };
    
    const [password, setPassword] = useState("");
    const handleChange_password = (event) => {
        setPassword(event.target.value);
    };
    
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoginValid, setIsLoginValid] = useState(null);
    
    const login = async () => {
        if (isLoggingIn !== true) {
            if (email_or_username !== "" && password !== "") {
                setIsLoggingIn(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                try {
                    // TRY LOGIN WITH EMAIL
                    const userCredential = await signInWithEmailAndPassword(auth, email_or_username, password);
                    if (userCredential.user.uid !== null) {
                        try {
                            const userRef = doc(db, "users", userCredential.user.uid);
                            const user_snapshot = await getDoc(userRef);
                            const user_data = user_snapshot.data();
                            setUser(userRef.id, user_data);
                            console.log("Logged in as @" + user_data['username'] + "(" + user_data['display_name'] + ")");
                            setIsLoginValid(true);
                        } catch (error) {
                            console.log(error);
                        }
                    } else {}
                } catch (error_signin_withEmail) {
                    try {
                        // TRY LOGIN WITH UESRNAME
                        const username_query = query(
                            collection(db, 'users'),
                            where('username', '==', email_or_username),
                            limit(1)
                        );
                        const user_snapshot = await getDocs(username_query);
                        if (user_snapshot.docs.length > 0) {
                            var user_doc = user_snapshot.docs[0];
                            var user_data = user_snapshot.docs[0].data();
                            var email_found = user_data['email'];
                            const userCredential = await signInWithEmailAndPassword(auth, email_found, password);
                            if (userCredential.user.uid !== null) {
                                setUser(user_doc.id, user_data);
                                console.log("Logged in as " + userCredential.user.displayName);
                                setIsLoginValid(true);
                            } else {
                                setIsLoginValid(false);
                            }
                        } else {
                            setIsLoginValid(false);
                        }
                    } catch (error_signin_withUsername) {
                        setIsLoginValid(false);
                    }
                }
            } else {
                setIsLoginValid(false);
            }
            if (isLoginValid !== true) {
                document.getElementById("invalid").style.color = "rgb(255, 68, 83)";
            } else {
                document.getElementById("invalid").style.color = "transparent";
            }
        }
        setIsLoggingIn(false);
    }

    return (
        <div id='loginForm'>
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
                    <p className='gradient_text_2'>A few login step to give Hiclob a feedback!</p>
                </div>
                <div className='loginform'>
                    <div className='input_wrapper'>
                        <img src={process.env.PUBLIC_URL + 'assets/svg/person.svg'} alt='' />
                        <input
                            type='text' placeholder='Email/Username'
                            onChange={handleChange_email_or_username}
                        />
                    </div>
                    <div className='input_wrapper'>
                        <img src={process.env.PUBLIC_URL + 'assets/svg/password.svg'} alt='' />
                        <input
                            type='password' placeholder='Password'
                            onChange={handleChange_password}
                        />
                    </div>
                    <div className='loginform_under'>
                        <p id="invalid">Invalid authentication</p>
                        <button onClick={login}>
                            {isLoggingIn === true ? "Logging in..." : "Login"}
                        </button>
                        <p className='gradient_text_2'>
                            Have no account? Download <span onClick={downloadFunc}>Hiclob</span> to register!
                        </p>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default LoginForm;