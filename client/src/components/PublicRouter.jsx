import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PublicRouter = ({ children }) => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default PublicRouter;
