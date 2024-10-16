import './fullscreenPopup.css';

function FullscreenPopup({isShowed, child}) {
    
    if (isShowed === true) {
        return(
            <div className='popup' >
                {child}
            </div>
        );
    }
    
}

export default FullscreenPopup;