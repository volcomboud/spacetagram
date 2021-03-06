import {auth} from '../lib/firebase';
import {useRouter} from "next/router";
import Link from "next/link";
import {UserContext} from "../lib/context";
import {useContext} from "react";

export default function NavBar(){

    const router = useRouter();
    const {user} = useContext(UserContext);



    const signOut = () => {
        auth.signOut().then(
            router.reload()
        );
    }

    return(
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button className="btn-logo">Home</button>
                    </Link>
                </li>
                {user===null ?
                <li>
                    <Link href="/signup">
                        <button className="btn-black">Sign in</button>
                    </Link>
                </li>
                    :
                    <ul>
                <li>
                    <label>{user?.email}</label>
                </li>
                <li>
                        <button onClick={signOut} className="btn-black">Sign out</button>
                </li>
                    </ul>
                }
            </ul>
        </nav>
    );
}