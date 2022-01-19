import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NasaFetcher from "../components/NasaFetcher";
import {useState} from "react";
import PostFeed from "../components/PostFeed";
import {db, postToJSON} from "../lib/firebase";
import Loader from "../components/Loader";
import {collection, getDocs, limit, orderBy, query} from "firebase/firestore";

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
    console.log(props.data)
    const [posts, setPosts] = useState(props.data);
    const [postsEnd, setPostsEnd] =useState(false);
    const [loading, setLoading] = useState(false);

    const getMorePosts = async() =>{
        setLoading(true)
        const last = posts[posts.length -1];

        const cursor = typeof last.date;

        const query = db
            .collectionGroup('nasadaily')
            .orderBy('date', 'desc')
            .startAfter(cursor)
            .limit(LIMIT);

        const newPosts = (await query.get().docs.map((doc) => doc.data));

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
          <strong>ICI</strong>
        <NasaFetcher/>
          <PostFeed posts={posts}/>
          {!loading && !postsEnd && <button onClick={getMorePosts}>show more</button>}
            <Loader show={loading}/>
          {postsEnd && 'You\'ve reach the edge of the galaxy'}
      </main>


      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
