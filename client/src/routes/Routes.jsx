import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import { useSelector } from "react-redux";

import Spinner from "../components/Spinner";

import ProtectedRouter from "../components/ProtectedRouter";
import PublicRouter from "../components/PublicRouter";

import ApplyDoctor from "../pages/ApplyDoctor";
import Notification from "../pages/Notification";

import AdminPageDoctors from "../pages/admin/Doctor";
import AdminPageUsers from "../pages/admin/User";

import Profile from "../pages/doctor/Profile";

import Booking from "../pages/Booking";

import HomeAdmin from "../pages/admin/Home";
import HomeDoctor from "../pages/doctor/Home";
import HomeUser from "../pages/user/Home";

const RoutesPage = () => {
  const { loading } = useSelector((state) => state.alerts);
  const { user } = useSelector((state) => state.user);
  const Home = user?.isAdmin
    ? HomeAdmin
    : user?.isDoctor
    ? HomeDoctor
    : HomeUser;
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouter>
                <Home />
              </ProtectedRouter>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRouter>
                <ApplyDoctor />
              </ProtectedRouter>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRouter>
                <AdminPageDoctors />
              </ProtectedRouter>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRouter>
                <AdminPageUsers />
              </ProtectedRouter>
            }
          />
          <Route
            path="/doctor/profile/:id"
            element={
              <ProtectedRouter>
                <Profile />
              </ProtectedRouter>
            }
          />
          <Route
            path="/doctor/book-appointment/:doctorId"
            element={
              <ProtectedRouter>
                <Booking />
              </ProtectedRouter>
            }
          />
          <Route
            path="/get-all-notification"
            element={
              <ProtectedRouter>
                <Notification />
              </ProtectedRouter>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRouter>
                <Login />
              </PublicRouter>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRouter>
                <Register />
              </PublicRouter>
            }
          />
        </Routes>
      )}
      ;
    </>
  );
};

export default RoutesPage;
