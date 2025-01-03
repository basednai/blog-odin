import { useEffect, useState } from "react";
import { Post } from "../post";
import { Nav } from "../nav";
import { Link } from "react-router-dom";

export function Home() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch("/api/post", {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);

        setPosts(json.reverse());
      });
  }, []);

  return (
    <>
      {/* <div className="container mx-auto w-4/5"> */}
      <Nav />
      {posts &&
        posts
          .filter((post) => post.type != "comment" && post.publish)
          .map((post, i) => <Post key={i} post={post} />)}

      {posts &&
      posts.filter((p) => p.type == "post" && p.publish).length == 0 ? (
        <div className="absolute left-1/2 top-1/2 flex w-2/5 -translate-x-1/2 -translate-y-1/2 flex-col gap-2">
          <div className="hover:-translate-y- dark:hover:text-whit mt-8 w-fit self-center text-center duration-200 hover:-translate-y-2">
            <Link to="/post/new" className="flex-1 text-xl font-bold">
              No posts made yet, be the first!
            </Link>
          </div>
        </div>
      ) : null}
      {/* </div> */}
    </>
  );
}
