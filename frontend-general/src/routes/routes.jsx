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
import { ErrorPage } from "../components/pages/ErrorPage";
import { SignUp } from "../components/pages/SignUp";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
      <Route path="/signup" element={<SignUp />} errorElement={<ErrorPage />} />
      <Route path="/logout" element={<Logout />} errorElement={<ErrorPage />} />
      <Route
        path="/post/new"
        element={<EditorPage newPost={true} errorElement={<ErrorPage />} />}
      />
      <Route
        path="/post/:postId"
        element={<PostPage />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/post/edit/:postId"
        element={<EditorPage newPost={false} />}
      />
      <Route path="/profile/" element={<MyProfile />} />
      <Route path="*" element={<ErrorPage />} />
    </>,
  ),
);
