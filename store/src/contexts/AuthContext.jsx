import React, { useState, useEffect, useContext } from 'react'
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase-config'
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthContextProvider(props) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userFromDB, setUserFromDB] = useState()
    const [loading, setLoading] = useState(true);

    function signup(email, password, name, address, city, state, optIn) {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                sendEmailVerification(auth.currentUser)
                updateProfile(auth.currentUser, { displayName: name })
                setDoc(doc(db, "users", auth.currentUser.uid), { billing_address: address, city, state, cart: [], optIn })
            });
    }

    function login(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                window.location = "/"
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            if (user) {
                getDoc(doc(db, "users", user.uid)).then(res => setUserFromDB(res.data()))
            }
            setLoading(false);
        })
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userFromDB,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}