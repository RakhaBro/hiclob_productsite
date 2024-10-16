import { useContext } from 'react';
import { PopupStateContext } from '../../providers/popup_provider';
import './downloadConfirmation.css'

function DownloadConfirmation({ version, os, navigateFunc }) {

    const { setPopupState } = useContext(PopupStateContext);

    function closePopup() {
        setPopupState(false, <div></div>);
    }

    function download() {
        closePopup();
        navigateFunc();
    }

    return (
        <div id='downloadConfirmation'>
            <div>
                <div onClick={closePopup} className='btn_close'>
                    <img src={process.env.PUBLIC_URL + 'assets/svg/close.svg'} alt='' />
                </div>
            </div>
            <div className='content'>
                <img
                    className='hiclobLogo'
                    src={process.env.PUBLIC_URL + 'assets/img/hiclob_horizontal_white.webp'}
                    alt=''
                />
                <p className='gradient_text_2'>Download <b>{version ?? "Hiclob Latest"}</b> for <b>{os}</b>?</p>
                <button onClick={download}>
                    <img src={process.env.PUBLIC_URL + 'assets/svg/download.svg'} alt='' />
                    Download
                </button>
                <div></div>
            </div>
        </div>
    );
}

export default DownloadConfirmation;