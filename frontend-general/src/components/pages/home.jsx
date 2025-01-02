import { useEffect, useState } from "react";
import { Post } from "../post";
import { Nav } from "../nav";

export function Home() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch("/api/post", {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    })
      .then((resp) => resp.json())
      .then((json) => {
        setPosts(json.reverse());
      });
  }, []);




  return (
    <>
      {/* <div className="container mx-auto w-4/5"> */}
        <Nav />
        {posts &&
          posts.map((post, i) => (
            <Post
              key={i}
              post={post}
            />
          ))}
      {/* </div> */}
    </>
  );
}