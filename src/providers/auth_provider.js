import React, { createContext, useEffect, useState } from 'react';
import { db } from "../firebase.js";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

export const AuthStateContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));

    const setUser = (userId, userData) => {
        setUserId(userId);
        setUserData(userData);
    }

    const [ myFeedback, setMyFeedback ] = useState(null);
    const [ myFeedbackId, setMyFeedbackId ] = useState(null);

    const check_feedbackAvailability = async () => {
        console.log("User is logged in. Checking if it has given feedback before...");
        if (userId !== null) {
            const myFeedback_queried = await getDocs(query(
                collection(db, 'feedbacks'),
                where('uid', '==', userId),
                limit(1)
            ));
            if (myFeedback_queried.docs.length > 0) {
                const myFeedback_doc = myFeedback_queried.docs[0];
                setMyFeedbackId(myFeedback_doc.id);
                var myFeedback_data = myFeedback_doc.data();
                setMyFeedback(myFeedback_data);
            } else {
                setMyFeedback(null);
            }
        } else {
            setMyFeedback(null);
        }
    }

    useEffect(() => {
        console.log("Checking if user is logged in.");
        if (userData == null && userId == null) {
            setMyFeedback(null);
            setMyFeedbackId(null);
        } else {
            check_feedbackAvailability();
        }
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userId', userId);
    }, [userData, userId]);

    return (
        <AuthStateContext.Provider value={{
            userData, userId, setUser,
            myFeedback, setMyFeedback,
            myFeedbackId, setMyFeedbackId
        }}>
            {children}
        </AuthStateContext.Provider>
    );
};