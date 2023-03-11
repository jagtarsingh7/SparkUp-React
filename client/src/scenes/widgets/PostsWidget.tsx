import {useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import {setPosts} from "../../state";
import PostWidget from "././PostWidget";

interface PostsWidgetProps {
    userId: string;
    isProfile?: boolean;
  }

  interface RootStateProps {
    posts: {
      _id: string;
      userId: string;
      firstName: string;
      lastName: string;
      description: string;
      location: string;
      picturePath: string;
      userPicturePath: string;
      likes: { [userId: string]: boolean };
      comments: string[];
    }[];
    token: string;
  }

const PostsWidget = ({userId,isProfile = false}:PostsWidgetProps) => {
    const dispatch = useDispatch();
    const posts = useSelector((state:RootStateProps) => state.posts);
    const token = useSelector((state:RootStateProps) => state.token);

    console.log(posts);
    const getPosts = async() => {
        const response = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data}));

    }
    const getUserPosts = async() => {
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data}));

    };
    useEffect(() => {
        if(isProfile){
            getUserPosts();
        } else {
            getPosts();
        }
    },[]); //eslint-disable-line react-hooks/exhaustive-deps

return(
    <>
    {posts.map(
        ({
    
        _id,
        userId,
        firstName,
        lastName,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments,
    }) => (
        < PostWidget
        key={_id}
        postId={_id}
        postUserId={userId}
        name={`${firstName} ${lastName}`}
        description={description}
        location={location}
        picturePath={picturePath}
        userPicturePath={userPicturePath}
        likes={likes}
        comments={comments}
        />
)
)}
    </>
);

};

export default PostsWidget;
