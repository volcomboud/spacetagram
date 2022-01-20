import {useContext, useState} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut,signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from '../lib/firebase';
import {addDoc, collection} from "firebase/firestore";
import {toast} from "react-hot-toast";
import {UserContext} from "../lib/context";
import styles from "../styles/Home.module.css";
import {router} from "next/router";
import Loader from "../components/Loader";
import {useRouter} from "next/router";


export default function SignUp(props){

    const usersCollectionRef = collection(db, 'users')

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [newUser, setNewUser] = useState(true);
    const[loading, setLoading] = useState(false);

    const [user, setUser] = useState({});
    const {email} = useContext(UserContext);

    const router = useRouter()

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const register = async () => {
        setLoading(true)
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            await addDoc(usersCollectionRef, {registerEmail});
            toast.success(`Welcome, ${registerEmail}`)
            await router.push("/")
        }catch (error){
            console.log(error.message);
            toast.error(`${error.message}`)
        }
        setLoading(false)
    };
    const login = async () => {
        setLoading(true)
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            toast.success(`Greetings, ${loginEmail}`)
            await router.push("/")
        }catch (error){
            console.log(error.message);
            toast.error(`${error.message}`)
        }
        setLoading(false)
    };
    const logout = async () => {
        setLoading(true)
        await signOut(auth)
        toast.success(`See you later`)
        setNewUser(false)
        setLoading(false)
    };
    const switchLogIn = () =>{
        if(newUser)setNewUser(false)
        else setNewUser(true)
        setLoginPassword("calis")
        setLoginEmail("")
        setRegisterPassword("")
        setRegisterEmail("")
    }

    return(
        <main className={styles.main}>
            {email === null ?
                <div >
                    {newUser ?
                        <div className="logger">
                            <form>
                                <h1>Login</h1>
                                <div className="py-5">
                                    <input
                                        placeholder="email..."
                                        onChange={(event => setLoginEmail(event.target.value))}
                                    />
                                </div>

                                <div>
                                    <input
                                        type={"password"}
                                        placeholder="Password..."
                                        onChange={(event => setLoginPassword(event.target.value))}
                                    />
                                </div>
                                <label className="hover:cursor-grab p-3" onClick={switchLogIn}>new comer?</label>
                                {!loading ?
                                <button className="btn-black btn-logger" onClick={login}>Login</button>

                                    :
                                <Loader show={loading}/>
                                }
                            </form>
                        </div>
                        :
                        <div className="logger">
                            <h1>New space traveller</h1>
                            <div className="py-5">
                                <input
                                    placeholder="email..."
                                    onChange={(event => setRegisterEmail(event.target.value))}
                                />
                            </div>
                            <div>
                                <input
                                    type={"password"}
                                    placeholder="Password..."
                                    onChange={(event => setRegisterPassword(event.target.value))}
                                />
                            </div>
                            <label className="hover:cursor-grab" onClick={switchLogIn}>Already experienced?</label>
                            {!loading ?
                            <button className="btn-black btn-logger" onClick={register}>Create</button>
                                :
                                <Loader show={loading}/>
                            }
                        </div>
                    }

                </div>
                :
                <div>
                    <div className="logger">
                        <h1 className="py-16">User logged In :</h1>
                        {user?.email}
                    </div>
                    {!loading ?

                <button className="btn-black btn-show btn-logger "
                        onClick={logout}>Sign Out</button>

                        :
                        <Loader show={loading}/>
                    }
                </div>
            }
        </main>
    )
}