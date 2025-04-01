import {useState, useContext} from 'react'
import {AuthContext} from '../providers/AuthProvider.jsx';
import { Post } from './Post.jsx';
import { PostCreater } from './PostCreater.jsx';

export function PostsManager() {
    const {authStatus, setAuthStatus} = useContext(AuthContext);
    const [postsArr, setPostsArr] = useState([
        {
            id: 1,
            title: 'title1',
            text: 'desc1'
        },
        {
            id: 2,
            title: 't2',
            text: 'desc2'
        },
    ]);

    return (
        <div className="posts__container">
            {authStatus && <PostCreater></PostCreater>}
            {postsArr.map(post => 
                <Post
                    title={post.title}
                    text={post.text}
                    key={post.id}
                />
            )}
        </div>
    )
}