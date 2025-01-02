import { TextEditor } from "../textEditor";
import { Nav } from "../nav";
import { useState, useEffect } from "react";

export const NewPost = () => {
  const [content, setContent] = useState();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkZjFmYzU0LTJiNjgtNDY4ZC1hMjdjLTY3NDJmZDk3NDVhZCIsImFkbWluIjpmYWxzZSwidXNlcm5hbWUiOiJ1c2VyIiwicGFzc3dvcmQiOiIkMmEkMTAkZ29qeTVaZFJaZWt5b1U5NHh4N3BJZVpFNHA2NzBORkhmc0pwYmRNa0MxNWNva21ER3M2VVMiLCJpYXQiOjE3MzU2NzEwMzl9.25pSRSzKAKh-8-HBVKnIJp-nnPbYbVWkGpTNf7xUC5g";

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/post", {
        method: "POST",

        body: JSON.stringify({ content: content }),
        headers: {
          authorization: `Bearer ${token}`,
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
