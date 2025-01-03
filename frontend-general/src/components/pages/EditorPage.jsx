import { TextEditor } from "../textEditor";
import { Nav } from "../nav";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { userCheckNoId } from "../../utils/userIdFromJWT";

export const EditorPage = ({ newPost }) => {
  const { postId } = useParams();
  const [content, setContent] = useState();
  const [editContent, setEditContent] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    const authorize = async () => {
      const check = await userCheckNoId(postId);


      if (!check) {
        navigate("/error", {
          state: {
            errorMessage: "You do not have permission to edit this post.",
          },
        });
      }
    };
    if (!newPost) authorize();
  });
  //post or put post
  useEffect(() => {
    const fetchData = async () => {
      const data = newPost
        ? await fetch("/api/post", {
            method: "POST",

            body: JSON.stringify({ content: content }),
            headers: {
              authorization: `Bearer ${localStorage.getItem("authToken")}`,
              "Content-Type": "application/json",
            },
          })
        : await fetch(`/api/post/${postId}`, {
            method: "PUT",

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
        .then((data) => {
          console.log(data);
          navigate(`/post/${data.id}`);
        })
        .catch((err) => console.log(err));
    }
  }, [content, newPost, postId, navigate]);

  //fetch edit content
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/api/post/${postId}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const json = await data.json();
      return json;
    };
    if (!newPost) {
      fetchData()
        .then((data) => setEditContent(data.content))
        .catch((err) => console.log(err));
    }
  }, [postId, newPost]);

  return (
    <>
      <Nav />
      <h2 className="text-xl font-semibold">
        {newPost ? "New Post" : "Edit Post"}
      </h2>
      <div className="my-3">
        {newPost ? (
          <TextEditor setContent={setContent} editContent={editContent} />
        ) : (
          editContent != undefined && (
            <TextEditor setContent={setContent} editContent={editContent} />
          )
        )}
      </div>
    </>
  );
};

EditorPage.propTypes = {
  newPost: PropTypes.bool,
};
