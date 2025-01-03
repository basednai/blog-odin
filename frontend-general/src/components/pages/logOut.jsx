import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  let navigate = useNavigate();
  localStorage.removeItem("authToken");

  useEffect(() => {
    navigate("/login");
  });

  return (
    <>
      <div className="mx-auto flex h-screen w-2/5 flex-1 flex-col content-center items-center justify-center gap-2">
        <p className="text-xl font-bold">Logging out...</p>
        <div className="material-icons animate-spin text-5xl">refresh</div>
      </div>
    </>
  );
};
