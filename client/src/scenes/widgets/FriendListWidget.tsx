import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends  } from "../../state";
import { type } from "os";
import { palette } from "@mui/system";

interface StateProps {
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
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        friends: {
            _id: string;
            firstName: string;
            lastName: string;
            occupation: string;
            location: string;
            picturePath: string;
        }[];
        picturePath: string;
        location: string;
        occupation: string;
    };
  }

  type Props = {
    userId: string;
  }     

const FriendListWidget = ({ userId }: Props) => {

    const dispatch = useDispatch();
    const theme: any = useTheme();
    const { palette }: any = useTheme();
    const token = useSelector((state: StateProps) => state.token);
    const friends = useSelector((state: StateProps) => state.user.friends);

    const getFriends = async() => {
        const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        dispatch(setFriends({ friends: data}));
    };

    useEffect(() => {
        getFriends();
    },[]); //eslint-disable-line react-hooks/exhaustive-deps

    return(
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem"}}

            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );

};

export default FriendListWidget;