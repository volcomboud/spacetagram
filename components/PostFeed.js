import {useEffect, useState} from "react";
import AuthCheck from "./AuthCheck";
import HeartButton from './HeartButton';
import Image from "next/image";
import Link from "next/link";
import YoutubeEmbed from "./YoutubeEmbed";
import {matchedText} from "next/dist/build/webpack/plugins/jsconfig-paths-plugin";


export default function PostFeed(posts){
    return posts ? posts.posts.map((post) => <PostItem post={post} key={post.date} />):null;
}

const getDomain = (url) =>{
    const prefix = /^https?:\/\//i;
    const domain =  /^[^\/:]+/;

    let urlMod= url.toString().replace(prefix,"");

    if(urlMod.charAt(0)==="/"){
        urlMod=window.location.hostname + urlMod ;
    }
    const match = urlMod.match(domain);
    if(match){
        return (match[0]);
    }
    else return null
}

function PostItem({post}){
    const [show, setShow]= useState(false);
    const nasaUrl = 'apod.nasa.gov'

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
            {getDomain(post.url) === nasaUrl?
                <Image src={post.url} alt={post.title} width="934" height="800" priority={true}/>
                : <YoutubeEmbed srcUrl={post.url}
                />
            }


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