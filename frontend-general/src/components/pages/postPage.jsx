import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../post";
import { Nav } from "../nav";
import { Comments } from "../comments";


export const PostPage = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkZjFmYzU0LTJiNjgtNDY4ZC1hMjdjLTY3NDJmZDk3NDVhZCIsImFkbWluIjpmYWxzZSwidXNlcm5hbWUiOiJ1c2VyIiwicGFzc3dvcmQiOiIkMmEkMTAkZ29qeTVaZFJaZWt5b1U5NHh4N3BJZVpFNHA2NzBORkhmc0pwYmRNa0MxNWNva21ER3M2VVMiLCJpYXQiOjE3MzU2NzEwMzl9.25pSRSzKAKh-8-HBVKnIJp-nnPbYbVWkGpTNf7xUC5g";

  const [post, setPost] = useState();

  const { postId } = useParams();

  useEffect(() => {
    fetch(`/api/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((json) => {
        setPost(json);
      });
  }, [postId]);

  return (
      <>
      {/* <div className="container mx-auto w-4/5"> */}
          <Nav/>
        {post && (
          <Post
            post={post}
          />
        )}

        {post && <Comments comments={post.comments} post={post} />}
      {/* </div> */}
    </>
  );
};
