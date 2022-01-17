import {useState} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut,signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../lib/firebase';


export default function SignUp(props){

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const register = async () => {

        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        }catch (error){
            console.log(error.message);
        }
    };
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        }catch (error){
            console.log(error.message);
        }
    };
    const logout = async () => {

        await signOut(auth)
    };
    return(
        <>
            <div className="App">
                <div>
                    <h3>New space traveller</h3>
                    <input placeholder="email..."
                           onChange={(event => setRegisterEmail(event.target.value))}
                    />
                    <input placeholder="Password..."
                           onChange={(event => setRegisterPassword(event.target.value))}
                    />

                    <button onClick={register}>Create account</button>
                </div>


                <div>
                    <h3>Login</h3>
                    <input placeholder="email..."
                           onChange={(event => setLoginEmail(event.target.value))}
                    />
                    <input placeholder="Password..."
                           onChange={(event => setLoginPassword(event.target.value))}
                    />

                    <button onClick={login}>Login</button>
                </div>

                <div>
                    <h4>User logged In :</h4>
                    {/*Comme sur kotlin, le ? verifie si l'objet est vide*/}
                    {user?.email}
                    <button onClick={logout}>Sign Out</button>
                </div>
            </div>
        </>
    )
}