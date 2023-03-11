import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";

type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    picturePath: string;
    friends: string[];
    location: string;
    occupation: string;
}

type Params = {
    userId: string;
}

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const { userId } = useParams<Params>();
    const token = useSelector((state: any) => state.token);
    const loggedInUser = useSelector((state: any) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        getUser();
    }, []);

    if(!user)
        return null;
    
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    {userId && <UserWidget userId={userId} picturePath={user.picturePath} />}
                    <Box m="2rem 0" />
                    {userId && <FriendListWidget userId={userId} />}
                </Box>
                <Box
                flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={loggedInUser.picturePath} />
                    {userId && <PostsWidget userId={userId} isProfile/>}
                    <Box m="2rem 0" />
                </Box>
            </Box>
        </Box>
    );

}

export default ProfilePage;
