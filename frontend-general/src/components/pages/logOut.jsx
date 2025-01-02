import { useNavigate } from "react-router-dom";

export const Logout = () => {
  let navigate = useNavigate();
  localStorage.removeItem("authToken");

  setTimeout(() => {
      navigate('/login')
  }, 2000);

  return (
    <>
      <div className="mx-auto flex w-2/5 flex-1 flex-col content-center items-center justify-center gap-2 h-screen">
        <p className="text-xl font-bold">Logging out...</p>
        <div className="material-icons animate-spin text-5xl">refresh</div>
      </div>
    </>
  );
};
