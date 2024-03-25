import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Route/Private";
import AdminRoute from "./components/Route/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCatogory from "./pages/Admin/CreateCatogory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import ForgotPassword from "./pages/Auth/ForgotPassword.js";
import Products from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search.js";
import ProductDetails from "./pages/ProductDetails.js";
import Categories from "./pages/Categories.js";
import CategoryProduct from "./pages/CategoryProduct.js";
import CartPage from "./pages/CartPage.js";
import AdminOrders from "./pages/Admin/AdminOrders.js";
import Chat from "./chat.js";
import Tshirt from "./tshirt.js";
import Placeorder from "./pages/Placeorder.js";
import AdminBulkorder from "./pages/Admin/AdminBulkorder.js";
import CustmizedOrder from "./pages/user/CustmizedOrder.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/product/:slug" element={<ProductDetails />} />

        {/* dashboard for user  */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/custmizeorders" element={<CustmizedOrder />} />
          <Route path="user/tshirt" element={<Tshirt />} />
          <Route path="user/placeorder" element={<Placeorder />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        {/* //dashboard routing through adminRoute */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCatogory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/bulkorders" element={<AdminBulkorder />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<Pagenotfound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
