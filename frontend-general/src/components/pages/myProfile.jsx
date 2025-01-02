import { Nav } from "../nav";
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../../utils/userIdFromJWT";
import { Post } from "../post";

export const MyProfile = () => {
  const [posts, setPosts] = useState(undefined);
  const userId = getUserIdFromToken(localStorage.getItem("authToken"));

  useEffect(() => {
    fetch(`/api/post/user/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    })
      .then((resp) => resp.json())
      .then((json) => {
        setPosts(json);
      });
  }, [userId]);

  return (
    <>
      <Nav />
      <h1 className="text-3xl font-bold">My Posts</h1>
      {posts && posts.map((post, i) => <Post key={i} post={post} />)}
    </>
  );
};
