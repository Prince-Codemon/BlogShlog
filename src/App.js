import "./App.css";
import { Routes, Route  } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/CreateBlog";
import NFPage from "./pages/NFPage";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Creator, NotLogin, User } from "./Routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserFunctionMutation } from "./store/services/userService";
import { type, logout } from "./store/slice/userSlice";
import VerifyEmail from "./pages/VerifyEmail";
import EditBlog from "./pages/EditBlog";
import UserProfile from "./pages/UserProfile";
import ForgortPage from "./pages/ForgotPage";
import RHelmet from "./components/Helmet";
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [getuser, result] = useGetUserFunctionMutation();
  
  useEffect(() => {
    if (user) {
      getuser(user);
    }
  }, [user, getuser]);
  useEffect(() => {
    if (result.data) {
      dispatch(type(result.data.user.type));
    }
    if(result?.error?.status === 400){
      dispatch(logout())
    
    }
  }, [result, dispatch]);

  return (
    <>
      <RHelmet title="Home" />
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/user/:id" element={<UserProfile />} />
        {/* auth routes */}
        <Route path="/auth">
          <Route
            path="login"
            element={
              <NotLogin>
                <Login />
              </NotLogin>
            }
          />
          <Route
            path="register"
            element={
              <NotLogin>
                <Register />
              </NotLogin>
            }
          />
          <Route
            path="forgotpassword"
            element={
              <NotLogin>
                <ForgotPassword />
              </NotLogin>
            }
          />
          <Route
            path="reset-password/:token"
            element={
              <NotLogin>
                <ForgortPage />
              </NotLogin>
            }
          />
          <Route path="verify-email/:id" element={<VerifyEmail />} />
          <Route element={<NFPage />} />
        </Route>
        {/* user routes */}
        <Route path="/user">
          <Route
            path="profile"
            element={
              <User>
                <Profile />{" "}
              </User>
            }
          />
          <Route
            path="editprofile"
            element={
              <User>
                <EditProfile />{" "}
              </User>
            }
          />
          <Route path="*" element={<NFPage />} />
        </Route>
        {/* creator routes */}
        <Route path="/creator">
          <Route
            path="createblog"
            element={
              <Creator>
                <CreateBlog />
              </Creator>
            }
          />
          <Route
            path="dashboard"
            element={
              <Creator>
                <Dashboard />
              </Creator>
            }
          />
          <Route path="editblog/:id" element={<EditBlog />} />
        </Route>
        {/* not found page */}
        <Route path="*" element={<NFPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
