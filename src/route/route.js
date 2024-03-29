import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebars from "../components/Bar/sideBar/sideBar";
import ERHome from "../components/ERHome";
import SignIn from "../components/auth/signIn";
import District from "../components/Bar/masterData/district/district";
import Province from "../components/Bar/masterData/province/province";
import ShopList from "../components/shops/shopList";
import MDDeliveryType from "../components/MDDeliveryType";
import MDBrand from "../components/MDBrand";
import MDInventoryStatus from "../components/MDInventoryStatus";
import MDInventory from "../components/MDInventory";
import MDQuantityUnit from "../components/MDQuantityUnit";
import MDStore from "../components/MDStore";
import MDOutputProduct from "../components/MDOutputProduct";
import MDMainGroupSubGroup from "../components/MDMainGroup_SubGroup";
import MDProduct from "../components/MDProduct";
import MDPromotion from "../components/MDPromotion";
import ERCustomer from "../components/ERCustomer";
import ERProduct from "../components/ERProduct";
import ERProductDetail from "../components/ERProductDetail";
import ERProductPrice from "../components/ERProductPrice";
import ERProductPriceDetail from "../components/ERProductPriceDetail";
import EROrder from "../components/EROrder";
import EROrderDetail from "../components/EROrderDetail";
import EROutputVoucher from "../components/EROutputVoucher";
import EROutputVoucherDetail from "../components/EROutputVoucherDetail";
import ERVoucherType from "../components/ERVoucherType";
import ERInventory from "../components/ERInventory";
import ERGetBestSeller from "../components/ERGetBestSeller";
import MDInventoryHis from "../components/MDInventoryHis";
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
        <Route path="/deliveryType" element={<MDDeliveryType />} />
        <Route path="/brand" element={<MDBrand />} />
        <Route path="/quantityUnit" element={<MDQuantityUnit />} />
        <Route path="/store" element={<MDStore />} />
        <Route path="/outputProduct" element={<MDOutputProduct />} />
        <Route path="/mainGroup_subGroup" element={<MDMainGroupSubGroup />} />
        <Route path="/products" element={<MDProduct />} />
        <Route path="/productPrice" element={<ERProductPrice />} />
        <Route
          path="/productPriceDetail/:modelId"
          element={<ERProductPriceDetail />}
        />
        <Route path="/productManage" element={<ERProduct />} />
        <Route path="/productManage/:modelId" element={<ERProductDetail />} />
        <Route path="/customers" element={<ERCustomer />} />
        <Route path="/inventoryStatus" element={<MDInventoryStatus />} />
        <Route path="/inventory" element={<MDInventory />} />
        <Route path="/inventoryManage" element={<ERInventory />} />
        <Route path="/orders" element={<EROrder />} />
        <Route path="/orders/:saleOrderId" element={<EROrderDetail />} />
        <Route path="/outputVoucher" element={<EROutputVoucher />} />
        <Route
          path="/outputVoucher/:outputVoucherId"
          element={<EROutputVoucherDetail />}
        />
        <Route path="/inventoryManage/:modelId" element={<MDInventoryHis />} />
        <Route path="/voucherType" element={<ERVoucherType />} />
        <Route path="/promotion" element={<MDPromotion />} />
        <Route path="/bestSeller" element={<ERGetBestSeller />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
