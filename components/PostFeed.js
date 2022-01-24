import {useState} from "react";
import AuthCheck from "./AuthCheck";
import HeartButton from './HeartButton';
import Image from "next/image";
import Link from "next/link";


export default function PostFeed(posts){
    return posts ? posts.posts.map((post) => <PostItem post={post} key={post.date} />):null;
}

function PostItem({post}){
    const [show, setShow]= useState(false)

    //TODO a    EFFACER
    const postRef = 0
    const showMore = () =>{
        if(show)setShow(false);
        else setShow(true)
    }
    return(
        <div className="card">
           <strong className="card-date push-left">{post.date}</strong>
            <h2 className="card-title">
                {post.title}
            </h2>
            <Image src={post.url} alt={post.title} width="934" height="800" priority={true} />
            {/*<img src={post.url} alt={post.title}/>*/}


            {show?
                <div>
                    <button className="btn-black" onClick={showMore}>Show less</button>
                    <div className="py-5 card-container">
                        <div className="card-explanation">
                            <p className="explanation-p">{post.explanation}</p>
                        </div>
                    </div>
                </div>
                :
                <button className="btn-black" onClick={showMore}>Description</button>

            }
            <footer>
                <span className="push-left heart">
                    👽{post.heartCount || 0}
                    <AuthCheck
                        fallback={
                        <Link href="/signup">
                            <button className="btn-black" >👽 Sign in </button>
                        </Link>
                        }>
                        <HeartButton postRef={postRef}/>
                    </AuthCheck>
                </span>
            </footer>
        </div>
    );
}