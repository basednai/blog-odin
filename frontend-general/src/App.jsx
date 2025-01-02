import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

const App = () => {
  return (
    <div className="container mx-auto w-4/5">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
