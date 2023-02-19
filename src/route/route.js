import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebars from "../components/Bar/sideBar/sideBar";
//import ErrorPage from './ErrorPage';
import Home from "../components/home/home";
import SignIn from "../components/auth/signIn";
import NavBar from "../components/Bar/navBar/navBar";
import District from "../components/Bar/masterData/district/district";
import Province from "../components/Bar/masterData/province/province";
import Product from "../components/products/product";
import DashBoard from "../components/dashBoard/dashBoard";
import ProductCat from "../components/products/productCat";
import ShopList from "../components/shops/shopList";
import Promotion from "../components/promotion/promotion";
import Model from "../components/model/model";
function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Sidebars />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productCat" element={<ProductCat />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/district" element={<District />} />
        <Route path="/province" element={<Province />} />
        <Route path="/product" element={<Product />} />
        <Route path="/shopList" element={<ShopList />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/model" element={<Model />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
