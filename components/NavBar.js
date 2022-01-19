import {auth} from '../lib/firebase';
import {useRouter} from "next/router";
import Link from "next/link";

export default function NavBar(){

    const router = useRouter();


    const signOut = () => {
        auth.signOut();
        router.reload();
    }

    return(
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button className="btn-logo">ACCUEIL</button>
                    </Link>
                </li>
                <li>
                    <Link href="/signup">
                        <button className="btn-blue">Se connecter</button>
                    </Link>
                </li>
                )}
            </ul>
        </nav>
    );
}