import {useContext, useState} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut,signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from '../lib/firebase';
import {addDoc, collection} from "firebase/firestore";
import {toast} from "react-hot-toast";
import {UserContext} from "../lib/context";
import styles from "../styles/Home.module.css";
import {router} from "next/client";
import {useRouter} from "next/router";


export default function SignUp(props){

    const usersCollectionRef = collection(db, 'users')

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({});
    const {email} = useContext(UserContext);

    const router = useRouter()

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const register = async () => {

        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            await addDoc(usersCollectionRef, {registerEmail});
            toast.success(`Welcome, ${registerEmail}`)
            await router.push("/")
        }catch (error){
            console.log(error.message);
            toast.error(`${error.message}`)
        }
    };
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            toast.success(`Greetings, ${loginEmail}`)
            await router.push("/")
        }catch (error){
            console.log(error.message);
            toast.error(`${error.message}`)
        }
    };
    const logout = async () => {

        await signOut(auth)
        toast.success(`See you later`)
        setNewUser(false)
    };
    const switchLogIn = () =>{
        if(newUser)setNewUser(false)
        else setNewUser(true)
        console.log("click")
    }
    return(
        <main className={styles.main}>
            {email === null ?
                <div className="py-5">
                    {newUser ?
                        <div>
                            <h1>Login</h1>
                            <input placeholder="email..."
                                   onChange={(event => setLoginEmail(event.target.value))}
                            />
                            <input placeholder="Password..."
                                   onChange={(event => setLoginPassword(event.target.value))}
                            />
                            <label className="hover:cursor-wait" onClick={switchLogIn}>new comer?</label>
                            <button onClick={login}>Login</button>
                        </div>
                        :
                        <div>
                            <h1>New space traveller</h1>
                            <input placeholder="email..."
                                   onChange={(event => setRegisterEmail(event.target.value))}
                            />
                            <input placeholder="Password..."
                                   onChange={(event => setRegisterPassword(event.target.value))}
                            />
                            <label className="hover:cursor-wait" onClick={switchLogIn}>Already experienced?</label>
                            <button onClick={register}>Create account</button>
                        </div>
                    }

                </div>
                :
                <div>
                <h1>User logged In :</h1>
            {user?.email}
                <button onClick={logout}>Sign Out</button>
                </div>
            }
        </main>
    )
}