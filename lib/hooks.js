import {auth, db} from './firebase'
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, getDocs, query, where} from "firebase/firestore";

export function useUserData(){
    const [user] = useAuthState(auth);
    const [email, setEmail] = useState(null);

    useEffect(() => {

            if (user) {
                const email = user.email
                setEmail({email})
                console.log(email+user.email);
            } else {
                setEmail(null);
            }

    }, [user]);

    return {user, email};
}