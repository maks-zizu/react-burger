import React, { ReactElement, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import BurgerMain from "./components/burger-main/BurgerMain";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Profile from "./components/profile/Profile";
import IngredientDetails from "./components/ingredient-details/IngredientDetails";
import Modal from "./components/modal/Modal";
import useModal from "./hooks/useModal";
import { useAppDispatch } from "./services/store";
import { ingredientsInit } from "./services/ingredientsSlice";
import ProfileNavbar from "./components/profile/ProfileNavbar";
import OrderList from "./components/profile/OrderList";

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
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfileNavbar />}>
          <Route index element={<Profile />} />
          <Route path="order" element={<OrderList />} />
        </Route>
        <Route path="/orders" element={<OrderList />} />
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
    </div>
  );
}

export default App;
