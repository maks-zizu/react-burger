import React, { ReactElement, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import BurgerMain from "./components/burger-main/BurgerMain";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./components/profile/Profile";
import IngredientDetails from "./components/ingredient-details/IngredientDetails";
import Modal from "./components/modal/Modal";
import useModal from "./hooks/useModal";
import { useAppDispatch } from "./services/store";
import { ingredientsInit } from "./services/ingredientsSlice";
import ProfileNavbar from "./components/profile/ProfileNavbar";
import OrderList from "./components/profile/OrderList";
import { ProtectedRoute } from "./services/auth/auth";
import FeedMain from "./components/feed/FeedMain";
import FeedDetails from "./components/feed/FeedDetails";

function App(): ReactElement {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(ingredientsInit());
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const { closeModal } = useModal();
  const handleModalClose = () => {
    navigate(-1);
    closeModal();
  };

  return (
    <div className="App">
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<BurgerMain />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/feed/:id" element={<FeedDetails />} />
        <Route
          path="/profile/orders/:id"
          element={<ProtectedRoute children={<FeedDetails />} />}
        />
        <Route
          path="/register"
          element={<ProtectedRoute children={<Registration />} anonymous />}
        />
        <Route
          path="/forgot-password"
          element={<ProtectedRoute children={<ForgotPassword />} anonymous />}
        />
        <Route
          path="/reset-password"
          element={<ProtectedRoute children={<ResetPassword />} anonymous />}
        />
        <Route
          path="/login"
          element={<ProtectedRoute children={<Login />} anonymous />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute children={<ProfileNavbar />} />}
        >
          <Route index element={<ProtectedRoute children={<Profile />} />} />
          <Route
            path="orders"
            element={<ProtectedRoute children={<OrderList />} />}
          />
        </Route>
        <Route path="/feed" element={<FeedMain />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={handleModalClose}>
                <FeedDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={handleModalClose}>
                <FeedDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
