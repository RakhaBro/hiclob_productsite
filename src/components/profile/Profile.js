import { useContext, useState } from 'react';
import './profile.css'
import { PopupStateContext } from '../../providers/popup_provider';
import { AuthStateContext } from '../../providers/auth_provider';
import LoginForm from '../../forms/loginForm/LoginForm';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

function Profile() {

    const { setPopupState } = useContext(PopupStateContext);
    const closePopup = () => {
        setPopupState(false, <div></div>);
    }
    
    const { userData, userId, setUser } = useContext(AuthStateContext);
    const [ isLoggingOut, setIsLoggingOut ] = useState(false);
    const logout = async () => {
        if (isLoggingOut !== true) {
            setIsLoggingOut(true);
            try {
                await signOut(auth);
                setUser(null, null);
            } catch (error) {console.log(error);}
        }
        setIsLoggingOut(false);
    }

    if (userData === null) {
        return(<LoginForm />);
    } else {
        return(
            <div id='profilePopup'>
                <div>
                    <div onClick={closePopup} className='btn_close'>
                        <img src={process.env.PUBLIC_URL + 'assets/svg/close.svg'} alt='' />
                    </div>
                </div>
                <div className='content'>
                    {userData['photo_url'] !== null
                        ? <img
                            className='userPhoto'
                            src={userData['photo_url']}
                            alt=''
                        />
                        : <div className='no_photo_url_container'>
                            <img
                                className='no_photo_url'
                                src={process.env.PUBLIC_URL + "assets/svg/person.svg"}
                                alt=''
                            />
                        </div>
                    }
                    <p>@{userData['username']}</p>
                    <p className='gradient_text_2'>
                        You are currently logging in as
                        <br />
                        <b>{userData['display_name']}</b>
                    </p>
                    <button onClick={logout}>
                        {isLoggingOut === true ? "Logging Out..." : "Logout"}
                    </button>
                    <div></div>
                </div>
            </div>
        );
    }
}

export default Profile;