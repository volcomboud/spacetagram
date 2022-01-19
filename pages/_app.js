import '../styles/globals.css';
import {UserContext} from "../lib/context";
import NavBar from "../components/NavBar";
import {Toaster} from "react-hot-toast";
import {useUserData} from "../lib/hooks";

function MyApp({ Component, pageProps }) {
    const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
        <NavBar />

            <Component {...pageProps} />
            <Toaster/>
    </UserContext.Provider>
  );
}

export default MyApp
