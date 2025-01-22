import React, { useContext } from 'react';
import { PopupStateContext } from '../../providers/popup_provider.js';
import DownloadConfirmation from '../downloadConfirmation/DownloadConfirmation.js';
import './releaseItem.css';
import { useNavigate } from 'react-router-dom';

const ReleaseItem = React.memo(({releaseName, isNew, isStable, releaseYear, releaseDate, downloads}) => {

    const { setPopupState } = useContext(PopupStateContext);

    function showPopup(ui) {
        setPopupState(true, ui);
    }

    const navigate = useNavigate();
    function navigateToDownload() {
        navigate("/download");
    }

    return (
        <div id="release_item">

            <div className="releases_table_child table_left box_shadow_dark">
                <img src={process.env.PUBLIC_URL + 'assets/img/hiclob_logo.webp'} alt='' />
                <div className="releases_table_child_first_content">
                    <p>
                        {releaseName} {isNew ? <span className="gradient_text_1">(New)</span> : null}
                    </p>
                    <p className="gradient_text_2">{isStable ? "Stable" : "Unstable"}</p>
                </div>
                <div className="separator"></div>

                <div className="releases_table_child_first_content">
                    <p>{releaseYear}</p>
                    <p className="gradient_text_2">{releaseDate}</p>
                </div>
                <div className="separator"></div>

                <div className="releases_table_child_first_content">
                    <p>{downloads}</p><p className="gradient_text_2">Downloads</p>
                </div>

            </div>

            <div
                className="releases_table_child btn_download box_shadow_dark"
                onClick={() => showPopup(
                    <DownloadConfirmation version={releaseName} os={"Android"} navigateFunc={navigateToDownload} />
                )}
            >
                <img src={process.env.PUBLIC_URL + 'assets/svg/android.svg'} alt='' />
                <img src={process.env.PUBLIC_URL + 'assets/svg/download.svg'} className="img_download" alt='' />
                <div><p>Download</p><p className="gradient_text_2">Android</p></div>
            </div>

            <div
                className="releases_table_child btn_download box_shadow_dark"
                onClick={() => showPopup(
                    <DownloadConfirmation version={releaseName} os={"IOS"} navigateFunc={navigateToDownload} />)
                }
            >
                <img src={process.env.PUBLIC_URL + 'assets/svg/apple.svg'} alt='' />
                <img src={process.env.PUBLIC_URL + 'assets/svg/download.svg'} className="img_download" alt='' />
                <div><p>Download</p><p className="gradient_text_2">IOS</p></div>
            </div>
        </div>
    );
});

export default ReleaseItem;