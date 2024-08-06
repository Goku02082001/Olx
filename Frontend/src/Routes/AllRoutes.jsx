import { Route, Routes } from "react-router-dom";
import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import AddItems from "../components/AddItems";
import MyItem from "../components/MyItem";
import ItemPage from "../components/ItemPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/addItem" element={<AddItems />} />
      <Route path="/myItems" element={<MyItem />} />
      <Route path="/itemPage/:id" element={<ItemPage />} />
    </Routes>
  );
};

export default AllRoutes;