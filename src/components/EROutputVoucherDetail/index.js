import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./css/index.css";

import { getDetailOutputVoucherAPI } from "../../controller/EROutputVoucher";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
function EROutputVoucherDetail({ route }) {
  const classes = useStyles();

  let outputVoucherId = useParams();
  //console.log(outputVoucherId.outputVoucherId);

  const [openModal, setOpenModal] = React.useState(false);
  const [deleteNote, setDeleteNote] = useState("");

  let [loading, setLoading] = useState(false);
  const [outputVoucherDetail, setOutputVoucherDetail] = useState({});
  const [outputVoucherDetailList, setOutputVoucherDetailList] = useState([]);
  const [beforeVAT, setBeforeVAT] = useState(0);
  const [VAT, setVAT] = useState(0);
  const [afterVAT, setAfterVAT] = useState(0);

  const setTime = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const getDetail = async () => {
    const result = await getDetailOutputVoucherAPI(
      outputVoucherId.outputVoucherId
    );
    if (result.status === 200) {
      setOutputVoucherDetail(result.data.data.outputVoucher);
      setOutputVoucherDetailList(
        result.data.data.outputVoucher.md_outputVoucherDetails
      );
      setBeforeVAT(result.data.data.outputVoucher.totalAmountBeforeVAT);
      setVAT(result.data.data.outputVoucher.totalVAT);
      setAfterVAT(result.data.data.outputVoucher.totalAmountAfterVAT);
      //console.log(result.data.data.outputVoucher);
    }
  };
  useEffect(() => {
    setTime();
    getDetail();
  }, []);

  return (
    <div
      style={{
        background: "#E5E4E2",
        height: "900px",
      }}
    >
      <div
        style={{ marginLeft: "20px", marginRight: "20px", paddingTop: "20px" }}
      >
        <div className="webContainer1 border">Chi tiết phiếu xuất</div>
        <div
          className="d-flex mt-3"
          style={{
            background: "#ffffff",
            paddingLeft: 50,
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <div
            className="col-4"
            style={{
              paddingRight: 20,
            }}
          >
            <div>{"Mã phiếu xuất: " + outputVoucherDetail.outputVoucherId}</div>
            <div>{"Mã đơn hàng: " + outputVoucherDetail.saleOrderId}</div>

            <div>
              {outputVoucherDetail.paymentOrderTypeId === 1
                ? "Thanh toán: " +
                  outputVoucherDetail.paymentOrderTypeId +
                  " - Thanh toán COD"
                : ""}
            </div>
            <div>
              {"Ngày tạo: " +
                new Date(outputVoucherDetail.createdDate).toLocaleDateString()}
            </div>
          </div>
          <div className="col-5">
            <div style={{ fontWeight: "bold" }}>Khách hàng</div>
            <div>
              {"Anh/Chị: " +
                outputVoucherDetail.customerName +
                " - " +
                outputVoucherDetail.customerPhone}
            </div>
            <div>{outputVoucherDetail.customerFullAddress}</div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <div className="col-4">Trước VAT: </div>
              <div
                style={{
                  color: "#CE2029",
                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                }}
              >
                {beforeVAT ? beforeVAT.toLocaleString() : 0}
              </div>
            </div>
            <div className="d-flex">
              <div className="col-4">Thuế VAT: </div>
              <div
                style={{
                  color: "#FF91A4",

                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                }}
              >
                {VAT ? VAT.toLocaleString() : 0}
              </div>
            </div>
            <div className="d-flex">
              <div className="col-4">Sau VAT: </div>
              <div
                style={{
                  color: "#3B3C36",
                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                }}
              >
                {afterVAT ? afterVAT.toLocaleString() : 0}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            style={{
              backgroundColor: "#cccccc",
              marginTop: 8,
              paddingLeft: 8,
              paddingTop: 4,
              paddingBottom: 4,
              fontWeight: "bold",
            }}
          >
            Thông tin chi tiết xuất
          </div>
          <div style={{ backgroundColor: "#ffffff" }}>
            <div
              className="d-flex"
              style={{
                marginLeft: "50px",
                marginRight: "50px",
                paddingTop: 12,
              }}
            >
              <table className="table mt-2 ">
                <thead>
                  <tr style={{ background: "#848482" }}>
                    <th
                      style={{ color: "#ffffff", fontWeight: "bold" }}
                      scope="col"
                      className="col-1"
                    >
                      Mã
                    </th>
                    <th
                      style={{ color: "#ffffff", fontWeight: "bold" }}
                      scope="col"
                      className="col-3"
                    >
                      Sản phẩm
                    </th>

                    <th
                      style={{ color: "#ffffff", fontWeight: "bold" }}
                      scope="col"
                      className="col-2"
                    >
                      IMEI
                    </th>
                    <th
                      style={{ color: "#ffffff", fontWeight: "bold" }}
                      scope="col"
                    >
                      Số lượng
                    </th>
                    <th
                      style={{ color: "#ffffff", fontWeight: "bold" }}
                      scope="col"
                    >
                      Tổng tiền
                    </th>
                    <th
                      style={{ color: "#ffffff", fontWeight: "bold" }}
                      scope="col"
                    >
                      Ngày tạo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {outputVoucherDetailList.map((item, index) => (
                    <tr key={index}>
                      <th scope="item">{item.outputVoucherDetailId}</th>
                      <td>
                        <div>{item.productId}</div>
                      </td>

                      <td>
                        <div>{item.IMEI}</div>
                      </td>
                      <td>
                        <div>{item.quantity}</div>
                      </td>
                      <td>{item.salePriceVAT.toLocaleString()}</td>
                      <td>{new Date(item.createdDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          open={openModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              className="border-bottom fw-bold"
              style={{ paddingBottom: "16px" }}
            >
              Xác nhận huỷ đơn
            </div>

            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: 24 }}
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Lý do huỷ"
                multiline
                required
                rows={6}
                style={{ width: "90%", marginTop: 10 }}
                value={deleteNote}
                onChange={(value) => setDeleteNote(value.target.value)}
              />
            </div>

            <div
              className="d-flex justify-content-center"
              style={{ marginTop: 20 }}
            >
              <div style={{ marginRight: 20 }}>
                <Button variant="outlined" onClick={handleCloseModal}>
                  Quay lại
                </Button>
              </div>
              <div style={{ marginLeft: 20 }}>
                <Button variant="contained">Đồng ý</Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      <div>
        {loading ? (
          loading
        ) : (
          <Backdrop className={classes.backdrop} open>
            <RingLoader color="#36d7b7" />
          </Backdrop>
        )}
      </div>
    </div>
  );
}
export default EROutputVoucherDetail;
