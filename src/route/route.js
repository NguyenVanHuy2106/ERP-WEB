import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebars from "../components/Bar/sideBar/sideBar";
//import ErrorPage from './ErrorPage';
import ERHome from "../components/ERHome";
import SignIn from "../components/auth/signIn";
// import NavBar from "../components/Bar/navBar/navBar";
import District from "../components/Bar/masterData/district/district";
import Province from "../components/Bar/masterData/province/province";

import DashBoard from "../components/dashBoard/dashBoard";

import ShopList from "../components/shops/shopList";
import Promotion from "../components/promotion/promotion";
import MDDeliveryType from "../components/MDDeliveryType";
import MDBrand from "../components/MDBrand";
// import MainGroup from "../components/MDMainGroup_SubGroup/MDMainGroup";
// import SubGroup from "../components/subGroup/subGroup";
import MDQuantityUnit from "../components/MDQuantityUnit";
import MDStore from "../components/MDStore";
import MDOutputProduct from "../components/MDOutputProduct";
import MDMainGroupSubGroup from "../components/MDMainGroup_SubGroup";
import MDProduct from "../components/MDProduct";
import ERCustomer from "../components/ERCustomer";
import ERProduct from "../components/ERProduct";
import ERProductDetail from "../components/ERProductDetail";
function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Sidebars />
      <Routes>
        <Route path="/" element={<ERHome />} />
        <Route path="/home" element={<ERHome />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/district" element={<District />} />
        <Route path="/province" element={<Province />} />
        <Route path="/shopList" element={<ShopList />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/deliveryType" element={<MDDeliveryType />} />
        <Route path="/brand" element={<MDBrand />} />
        {/* <Route path="/mainGroup" element={<MainGroup />} />
        <Route path="/subGroup" element={<SubGroup />} /> */}
        <Route path="/quantityUnit" element={<MDQuantityUnit />} />
        <Route path="/store" element={<MDStore />} />
        <Route path="/outputProduct" element={<MDOutputProduct />} />
        <Route path="/mainGroup_subGroup" element={<MDMainGroupSubGroup />} />
        <Route path="/products" element={<MDProduct />} />
        <Route path="/productManage" element={<ERProduct />} />
        <Route path="/productManage/:modelId" element={<ERProductDetail />} />
        <Route path="/customers" element={<ERCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
