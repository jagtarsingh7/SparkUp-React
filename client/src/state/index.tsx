import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  mode: string;
  user: {
    friends: string[] | null;
  } | null;
  token: string | null;
  posts: any[];
}

interface SetLoginPayload {
  user: any;
  token: string;
}

interface SetFriendsPayload {
  friends: string[] | null;
}

interface SetPostPayload {
  post_id: string;
  post: string;
}

const initialState: AuthState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action: PayloadAction<SetLoginPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action: PayloadAction<SetFriendsPayload>) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action: PayloadAction<{ posts: any[] }>) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action: PayloadAction<SetPostPayload>) => {
      const updatedPosts = state.posts.map((post) => {
        console.log(action.payload)
        if (post._id === action.payload.post_id) 
          return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
