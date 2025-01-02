import { useState } from "react";
import { Nav } from "../nav";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { token } = await response.json();

      // Save the JWT to localStorage
        localStorage.setItem("authToken", token);
        console.log(token);


      alert("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your credentials.");
    }
  };
  return (
    <>
      <div className="flex h-screen flex-col">
        <Nav />

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-2/5 flex-1 flex-col content-center justify-center gap-2"
        >
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="grow"
              placeholder="Username"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-blue-400"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};