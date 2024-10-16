import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/Home.js';
import ReleasesPage from './pages/releases/Releases.js';
import FeedbacksPage from './pages/feedbacks/Feedbacks.js';
import DownloadPage from './pages/download/Download.js';
import FullscreenPopup from './components/popup/FullscreenPopup.js';
import { PopupStateContext } from './providers/popup_provider.js';

function App() {

  const { isPopupShowed, popupChild } = useContext(PopupStateContext);

  return (
    <div className="App">
      <FullscreenPopup isShowed={isPopupShowed} child={popupChild} />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/releases" element={<ReleasesPage />} />
          <Route path="/feedbacks" element={<FeedbacksPage />} />
          <Route path="/download" element={<DownloadPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
