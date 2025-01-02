import { Nav } from "../nav";
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../../utils/userIdFromJWT";
import { Post } from "../post";

export const MyProfile = () => {
  const [posts, setPosts] = useState(undefined);
  const [filter, setFilter] = useState("post");
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
      <div className="dropdown dropdown-bottom flex-none">
        <div tabIndex="1" className="flex items-center text-2xl font-semibold">
          {filter == "post" ? "My Posts" : "My Comments"}
          <span className="material-icons text-4xl">keyboard_arrow_down</span>
        </div>
        <ul
          tabIndex="0"
          className="menu dropdown-content z-[1] w-52 rounded-lg border bg-base-100 p-2 shadow"
        >
          <li role="button" className="btn" onClick={() => setFilter("post")}>
            My Posts
          </li>
          <li role="button" className="btn" onClick={() => setFilter("comment")}>
            My Comments
          </li>
        </ul>
      </div>

      {posts && posts.filter(post => post.type == filter).map((post, i) => <Post key={i} post={post} />)}
    </>
  );
};
