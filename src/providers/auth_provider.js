import React, { createContext, useEffect, useState } from 'react';
import { db } from "../firebase.js";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";

export const AuthStateContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));

    const setUser = (userId, userData) => {
        setUserId(userId);
        setUserData(userData);
    }

    const [ availableFeedback, setAvailableFeedback ] = useState(null);
    const check_feedbackAvailability = async () => {
        if (userId !== null) {
            const availableFeedback_queried = await getDocs(query(
                collection(db, 'feedbacks'),
                where('uid', '==', userId)
            ));
            const availableFeedback_doc = availableFeedback_queried.docs[0];
            if (availableFeedback_queried.docs.length > 0) {
                var availableFeedback_data = availableFeedback_doc.data();
                setAvailableFeedback(availableFeedback_data);
            }
        }
    }

    useEffect(() => {
        if (userData == null && userId == null) {
            setAvailableFeedback(null);
        } else {
            check_feedbackAvailability();
        }
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userId', userId);
    }, [userData, userId]);

    return (
        <AuthStateContext.Provider value={{
            userData, userId, setUser,
            availableFeedback, check_feedbackAvailability
        }}>
            {children}
        </AuthStateContext.Provider>
    );
};