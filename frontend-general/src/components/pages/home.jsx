import { useEffect, useState } from "react";
import { Post } from "../post";
import { Nav } from "../nav";

function Home() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkZjFmYzU0LTJiNjgtNDY4ZC1hMjdjLTY3NDJmZDk3NDVhZCIsImFkbWluIjpmYWxzZSwidXNlcm5hbWUiOiJ1c2VyIiwicGFzc3dvcmQiOiIkMmEkMTAkZ29qeTVaZFJaZWt5b1U5NHh4N3BJZVpFNHA2NzBORkhmc0pwYmRNa0MxNWNva21ER3M2VVMiLCJpYXQiOjE3MzU2NzEwMzl9.25pSRSzKAKh-8-HBVKnIJp-nnPbYbVWkGpTNf7xUC5g";
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch("/api/post", {
      headers: { Authorization: `Bearer ${token}` },
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

export default Home;
