import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Home } from "../components/pages/home";
import { PostPage } from "../components/pages/postPage";
import { EditorPage } from "../components/pages/EditorPage";
import { MyProfile } from "../components/pages/myProfile";
import { Login } from "../components/pages/loginPage";
import { Logout } from "../components/pages/logOut";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/post/new" element={<EditorPage newPost={true} />} />
      <Route path="/post/:postId" element={<PostPage />} />
      <Route path="/post/edit/:postId" element={<EditorPage newPost={false} />} />
      <Route path="/profile/" element={<MyProfile />} />
      {/* <Route path="/profile/:userId" element={<Profile />} /> */}
    </>,
  ),
);
