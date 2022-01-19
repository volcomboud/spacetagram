
export default function PostFeed(posts){
    return posts ? posts.posts.map((post) => <PostItem post={post} key={post.date} />):null;
}

function PostItem({post}){
    console.log(post, 'ICI')
    return(
        <div className="card">
            <a>
               <strong>{post.date}</strong>
            </a>
            <h2>
                <a>{post.title}</a>
            </h2>
            <img src={post.url} alt={post.title}/>
            <footer>
                <span className="push-left">
                    💗{post.heartCount || 0} Love
                </span>
            </footer>
        </div>
    );
}