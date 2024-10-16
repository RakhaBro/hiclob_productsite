import React, { createContext, useEffect, useState } from 'react';

export const AuthStateContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
        console.log("User is now " + localStorage.getItem('user'));
    }, [user]);

    return (
        <AuthStateContext.Provider value={{ user, setUser }}>
            {children}
        </AuthStateContext.Provider>
    );
};