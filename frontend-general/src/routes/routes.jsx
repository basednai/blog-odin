import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Home } from "../components/pages/home";
import { PostPage } from "../components/pages/postPage";
import { NewPost } from "../components/pages/newPost";
import { MyProfile } from "../components/pages/myProfile";
import { Login } from "../components/pages/loginPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/post/new" element={<NewPost />} />
      <Route path="/post/:postId" element={<PostPage />} />
      <Route path="/profile/" element={<MyProfile />} />
      {/* <Route path="/profile/:userId" element={<Profile />} /> */}
    </>,
  ),
);
