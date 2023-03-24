import React, { useState, useEffect, createContext, useContext } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../controller/authController";
import { AiFillExclamationCircle } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@mui/material/Backdrop";
import { RingLoader, CircleLoader } from "react-spinners";
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
function Home({ navigation }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [authUserName, setAuthUserName] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [error, setError] = useState("");
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  let [loading, setLoading] = useState(false);

  const login = async () => {
    if (authUserName.length === 0) {
      setUserError("Nhập tên tài khoản");
    }
    if (authPassword.length === 0) {
      setPassError("Nhập mật khẩu");
    }
    if (authUserName.length !== 0 && authPassword.length !== 0) {
      setLoading(false);
      const result = await authApi(authUserName, authPassword);
      if (result.status === 200) {
        localStorage.setItem("username", result.data.data.username);
        localStorage.setItem("accessToken", result.data.data.accessToken);
        localStorage.setItem("userId", result.data.data.userId);
        setLoading(true);
        return navigate("/home");
      } else {
        //setError("Lỗi đăng nhập");
        setError(result.response.data.message);
        setLoading(true);
      }
    }
  };
  const onChangeEmail = (val) => {
    setAuthUserName(val.target.value);
    setUserError("");
    setError("");
  };
  const onChangePassword = (val) => {
    setAuthPassword(val.target.value);
    setPassError("");
    setError("");
  };
  const setTime = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };
  useEffect(() => {
    setTime();
  }, []);
  return (
    <div className="d-flex justify-content-center">
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0 d-flex align-items-center justify-content-center">
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-center">
                    <div style={{ fontSize: 35, fontWeight: "bold" }}>
                      ĐĂNG NHẬP
                    </div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <h5
                      className="fw-normal my-4 pb-3"
                      style={{ fontStyle: "italic" }}
                    >
                      Đăng nhập để sử dụng hệ thống
                    </h5>
                  </div>
                  {error && (
                    <div className="d-flex" style={{ marginBottom: 10 }}>
                      <div style={{ alignItems: "center", marginBottom: 2 }}>
                        <AiFillExclamationCircle size={25} color="#FF0000" />
                      </div>
                      <div style={{ alignItems: "center", marginTop: 5 }}>
                        <h6 className="fw-normal " style={{ color: "#FF0000" }}>
                          {error}
                        </h6>
                      </div>
                    </div>
                  )}
                </div>
                {userError && (
                  <div style={{ color: "#FF0000" }}>{userError}</div>
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Tên tài khoản"
                  id="email"
                  type="email"
                  size="lg"
                  onChange={(val) => onChangeEmail(val)}
                />
                {passError && (
                  <div style={{ color: "#FF0000" }}>{passError}</div>
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Mật khẩu"
                  id="password"
                  type="password"
                  size="lg"
                  onChange={(val) => onChangePassword(val)}
                />

                <MDBBtn
                  className="mb-4 px-5"
                  color="dark"
                  size="lg"
                  onClick={() => login()}
                >
                  Đăng nhập
                </MDBBtn>

                <div className="d-flex flex-row justify-content-center">
                  <a className="small text-muted" href="#!">
                    Quên mật khẩu?
                  </a>

                  <a href="#!" className="small text-muted">
                    Điều khoản và chính sách sử dụng
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
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

export default Home;
