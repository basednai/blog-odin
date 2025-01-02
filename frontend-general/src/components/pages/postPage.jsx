import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../post";
import { Nav } from "../nav";
import { Comments } from "../comments";
import { CommentEditor } from "../commentEditor";

export const PostPage = () => {

  const [post, setPost] = useState();
  const [commenter, setCommenter] = useState(false);
  const [content, setContent] = useState(undefined);
  const { postId } = useParams();

    useEffect(() => {
      console.log("running");

    fetch(`/api/post/${postId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    })
      .then((resp) => resp.json())
      .then((json) => {
        setPost(json);
      });
  }, [postId, content]);


      useEffect(() => {
        const fetchData = async () => {
          const data = await fetch(`/api/post/${postId}`, {
            method: "POST",

            body: JSON.stringify({ content: content }),
            headers: {
              authorization: `Bearer ${localStorage.getItem("authToken")}`,
              "Content-Type": "application/json",
            },
          });
          const json = await data.json();
          return json;
        };
        if (content != undefined) {
          fetchData()
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }
      }, [content, postId]);


  return (
    <>

      <Nav />
      {post && <Post post={post} showArrow={true} />}
      <button
        onClick={() => setCommenter(!commenter)}
        className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-blue-400"
      >
        Show Commenter
      </button>
      {commenter && <CommentEditor setContent={setContent} setCommenter={setCommenter} />}
      {post && <Comments comments={post.comments} post={post} />}
    </>
  );
};
