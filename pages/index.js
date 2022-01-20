import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NasaFetcher from "../components/NasaFetcher";
import {useState} from "react";
import PostFeed from "../components/PostFeed";
import {db, postToJSON} from "../lib/firebase";
import Loader from "../components/Loader";
import {collection, getDocs, limit, orderBy, query, startAfter} from "firebase/firestore";

const LIMIT = 5;
const dailyCollectionRef = collection(db,'nasadaily')

//NEXTJS render side rendering
export async function getServerSideProps(context){

    const postquery = query(dailyCollectionRef,orderBy('date','desc'),limit(LIMIT))
    const querySnapshot = await getDocs(postquery);

    const data = querySnapshot.docs.map((doc) => ({...doc.data()}));

    return {
        props: {data}
    }


}
export default function Home(props) {
    const [posts, setPosts] = useState(props.data);
    const [postsEnd, setPostsEnd] =useState(false);
    const [loading, setLoading] = useState(false);

    const getMorePosts = async() =>{
        setLoading(true)
        const last = posts[posts.length -1];

        const cursor = typeof last.date ==="string";

        const morePostQuery = query(dailyCollectionRef,orderBy('date','desc'),startAfter(cursor),limit(LIMIT))

        const querySnapshot = await getDocs(morePostQuery);
        const newPosts = querySnapshot.docs.map((doc) => ({...doc.data()}));


        setPosts(posts.concat(newPosts));
        setLoading(false);

        if(newPosts.length<LIMIT) setPostsEnd(true);
    };

  return (
    <div >
      <Head>
        <title>Spacetagram</title>
        <meta name="Shopify Chanllenge 2022" content="NASA api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NasaFetcher/>
          <PostFeed posts={posts}/>
          {!loading && !postsEnd &&
            <button className="btn-black btn-show " onClick={getMorePosts}>show more</button>}
            <Loader show={loading}/>
          {postsEnd && <label className="text-white text-3xl py-5">You&apos;ve reach the edge of the galaxy</label>}

      </main>
    </div>
  )
}
