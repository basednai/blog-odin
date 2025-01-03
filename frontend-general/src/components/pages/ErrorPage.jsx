import { useLocation } from "react-router-dom";
import { Nav } from "../nav";

export const ErrorPage = () => {
  const location = useLocation();
  const errorMessage =
    location.state?.errorMessage || "An unexpected error occurred.";

  return (
    <>
      <Nav />
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Oops!</h1>

        <p className="text-red-500">
          {errorMessage }
        </p>
      </div>
    </>
  );
};
