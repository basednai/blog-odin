import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Home from "../components/pages/home";
import { PostPage } from "../components/pages/postPage";
import { NewPost } from "../components/pages/newPost";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/post/new" element={<NewPost />} />
      <Route path="/post/:postId" element={<PostPage />} />
    </>,
  ),
);
