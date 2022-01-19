import Link from "next/link";
import {useContext} from "react";
import {UserContext} from "../lib/context";

export default function AuthCheck(props){
    const {email} = useContext(UserContext)

    return email ?
        props.children:
        props.fallback || <Link href="/signup">You need to be signed in </Link>
}