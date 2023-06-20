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
import AIBlog from "./pages/AIBlog";
import Sitemap from "./Sitemap";
import Faq from "./pages/Faq";
import OfflineMode from "./components/OfflineMode";
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {/* public routes */}
        <Route
          path="/"
          element={
            <OfflineMode>
              <Blogs />
            </OfflineMode>
          }
        />
        <Route path="/faq" element={<Faq />} />
        <Route path="/blog/:id" pr element={
          <OfflineMode>
            <Blog />
          </OfflineMode>
        } />
        <Route path="/user/:id" element={
          <OfflineMode>
            <UserProfile />
          </OfflineMode>
        } />
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
                <OfflineMode>
                <Profile />{" "}
                </OfflineMode>
              </User>
            }
          />
          <Route
            path="editprofile"
            element={
              <User>
                <OfflineMode>
                <EditProfile />{" "}
                </OfflineMode>
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
          <Route
            path="aiblog"
            element={
              <Creator>
                <AIBlog />{" "}
              </Creator>
            }
          />
          <Route path="editblog/:id" element={<EditBlog />} />
        </Route>
        {/* sitemap */}
        <Route path="/sitemap" element={<Sitemap />} />
        {/* not found page */}

        <Route path="*" element={<NFPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
