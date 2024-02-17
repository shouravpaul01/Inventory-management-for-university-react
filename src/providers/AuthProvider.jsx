import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useEffect, useState } from 'react';
import AuthContext from "../contexts/AuthContext";
import app from "../firebase/firebase.config";

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        // setIsLoading(false)
        return signOut(auth)
    }
    const updateUserPassword = async (newPassword) => {
        const signinUser = auth.currentUser;

        return updatePassword(signinUser, newPassword)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            
            // if (currentUser) {
            //     console.log('1');
            //     const loggedUser = {
            //         email: currentUser.email
            //     }
            //     fetch('http://localhost:5000/users/jwt-signin', {
            //         method: "POST",
            //         headers: {
            //             'content-type': 'application/json'
            //         },
            //         body: JSON.stringify(loggedUser)
            //     })
            //         .then(res => res.json())
            //         .then(data => {
            //             Cookies.set(import.meta.env.VITE_CookieName, data.token, {
            //                 expires: 1,
            //                 secure: true
            //             })

            //         })
            // }
            
            setUser(currentUser);
            setIsLoading(false);

        });
         //if access token has expired ,then  user will be signed out
        // const authToken = Cookies.get('BD-Tech-Solution');

        // if (!authToken) {
        //     logout()
        //         .then(() => {

        //         })
        //         .catch((error) => console.log(error))
        // }
        return () => unsubscribe();
    }, []);
    const value = {
        user,
        isLoading,
        signUp,
        signIn,
        logout,
        updateUserPassword
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export default AuthProvider;