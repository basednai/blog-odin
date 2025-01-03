import { Nav } from "../nav";
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../../utils/userIdFromJWT";
import { Post } from "../post";
import { dateTimeSort } from "../../utils/date-sort";

export const MyProfile = () => {
  const [posts, setPosts] = useState(undefined);
  const [filter, setPostFilter] = useState("both");
  const [draftFilter, setDraftFilter] = useState(false);
  const userId = getUserIdFromToken(localStorage.getItem("authToken"));

  useEffect(() => {
    fetch(`/api/post/user/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    })
      .then((resp) => resp.json())
      .then((json) => {
        setPosts(dateTimeSort(json));
      });
  }, [userId]);

  console.log(filter, posts);

  return (
    <>
      <Nav />
      <div className="flex items-center justify-between">
        <div className="dropdown-endflex-none dropdown dropdown-bottom">
          <div
            tabIndex="1"
            className="flex items-center text-2xl font-semibold"
          >
            {filter == "both"
              ? "My Posts & Comments"
              : filter == "post"
                ? "My Posts"
                : filter == "comment"
                  ? "My Comments"
                  : null}
            <span className="material-icons text-4xl">keyboard_arrow_down</span>
          </div>
          <ul
            tabIndex="0"
            className="menu dropdown-content z-[1] w-52 rounded-lg border bg-base-100 p-2 shadow"
          >
            <li
              role="button"
              className="btn"
              onClick={() => setPostFilter("both")}
            >
              Posts & Comments
            </li>
            <li
              role="button"
              className="btn"
              onClick={() => setPostFilter("post")}
            >
              My Posts
            </li>
            <li
              role="button"
              className="btn"
              onClick={() => setPostFilter("comment")}
            >
              My Comments
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end dropdown-bottom flex-none">
          <div tabIndex="1" className="text-l flex items-center font-semibold">
            {draftFilter ? "Drafts" : "Published"}
            <span className="material-icons text-l">keyboard_arrow_down</span>
          </div>
          <ul
            tabIndex="0"
            className="menu dropdown-content z-[1] w-52 rounded-lg border bg-base-100 p-2 shadow"
          >
            <li
              role="button"
              className="btn"
              onClick={() => setDraftFilter(false)}
            >
              Published
            </li>
            <li
              role="button"
              className="btn"
              onClick={() => setDraftFilter(true)}
            >
              Drafts
            </li>
          </ul>
        </div>
      </div>

      {posts && filter == "both"
        ? posts
            .filter((post) => (draftFilter ? !post.publish : post.publish))
            .map((post, i) => <Post key={i} post={post} />)
        : posts &&
          posts
            .filter((post) => post.type == filter)
            .filter((post) => (draftFilter ? !post.publish : post.publish))
            .map((post, i) => <Post key={i} post={post} />)}
    </>
  );
};
