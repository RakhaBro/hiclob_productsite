import React, { createContext, useState } from 'react';

export const PopupStateContext = createContext();

export const PopupProvider = ({ children }) => {
  
    const [isPopupShowed, setPopupShowed] = useState(false);
    const [popupChild, setPopupChild] = useState(<div></div>);

    const setPopupState = (isPopupShowed, popupChild) => {
        setPopupShowed(isPopupShowed);
        setPopupChild(popupChild);
    }

    return (
        <PopupStateContext.Provider value={{ isPopupShowed, popupChild, setPopupState }}>
            {children}
        </PopupStateContext.Provider>
    );
};