import { Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import { useEffect } from "react";
// eslint-disable-next-line react/prop-types
const ProtectedRouter = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading);
      const res = await axios.post(
        "http://localhost:8080/api/user/getUserData",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        <Navigate to="/login" />;
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRouter;
