import React, { createContext, useEffect, useState } from 'react';

export const AuthStateContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));

    const setUser = (userId, userData) => {
        setUserId(userId);
        setUserData(userData);
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(userData));
    }, [userData]);
    
    useEffect(() => {
        localStorage.setItem('userId', userId);
    }, [userId]);

    return (
        <AuthStateContext.Provider value={{ userData, userId, setUser }}>
            {children}
        </AuthStateContext.Provider>
    );
};