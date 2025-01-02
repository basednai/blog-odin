import { TextEditor } from "../textEditor";
import { Nav } from "../nav";
import { useState, useEffect } from "react";

export const NewPost = () => {
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/post", {
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
  }, [content]); // Runs whenever `count` changes

  return (
    <>
      <Nav />
      <TextEditor setContent={setContent} />
    </>
  );
};
